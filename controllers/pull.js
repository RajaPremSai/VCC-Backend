const fs = require("fs").promises;
const path = require("path");
const { s3Client, S3_BUCKET } = require("../config/aws-config");
const { ListObjectsCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), ".premGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    // const data = await s3Client
    //   .ListObjectsV2({
    // Bucket: S3_BUCKET,
    // Prefix: "commits/",
    //   })
    //   .promise();
    const command = new ListObjectsCommand({
      Bucket: S3_BUCKET,
      Prefix: "commits/",
    });
    const data = await s3Client.send(command);
    const objects = data.Contents;
    console.log(data.Contents)

    for (const object of objects) {
      const key = object.Key;
      const commitDir = path.join(
        commitsPath,
        path.dirname(key).split("/").pop()
      );
      await fs.mkdir(commitDir, { recursive: true });

      const params = {
        Bucket: S3_BUCKET,
        Key: key,
      };

      const command2 = new GetObjectCommand(params);
      const fileContent = await s3Client.send(command2);
      await fs.writeFile(path.join(repoPath, key), fileContent.Body);
      
      console.log("All commits pulled from S3");
    }
  } catch (err) {
    console.log("Unable to pull: ", err);
  }
}

module.exports = { pullRepo };
