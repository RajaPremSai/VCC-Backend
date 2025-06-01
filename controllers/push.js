const fs = require("fs").promises;
const path = require("path");
const { s3Client, S3_BUCKET } = require("../config/aws-config.js");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

async function pushRepo() {
  console.log("Pushing changes to the remote repository...");

  const repoPath = path.resolve(process.cwd(), ".premGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath);
    if (commitDirs.length === 0) {
      console.log("No commits found to push.");
      return;
    }

    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);

        const command = new PutObjectCommand({
          Bucket: S3_BUCKET,
          Key: `commits/${commitDir}/${file}`,
          Body: fileContent,
        });

        try {
          await s3Client.send(command);
          console.log(`Successfully uploaded ${file}`);
        } catch (uploadErr) {
          console.error(`Error uploading ${file}:`, uploadErr);
        }
      }
    }

    // After uploading all files, we can remove the local commit directory
    await fs.rmdir(commitsPath, { recursive: true });
    console.log("All changes pushed to the S3 bucket successfully.");
  } catch (err) {
    console.error("Error pushing changes to the S3:", err);
    throw err; // Re-throw to handle in the calling function
  }
}

module.exports = { pushRepo };
