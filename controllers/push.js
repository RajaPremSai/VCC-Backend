const fs=require("fs").promises;
const path = require("path");
const {s3, s3Bucket} = require("../config/aws-config.js");

async function pushRepo() {
    console.log("Pushing changes to the remote repository...");

    const repoPath = path.resolve(process.cwd(), ".premGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const commitDirs= await fs.readdir(commitsPath);
        if (commitDirs.length === 0) {
            console.log("No commits found to push.");
            return;
        }
        for(const commitDir of commitDirs) {
            const commitPath=path.join(commitsPath, commitDir);
            const files=await fs.readdir(commitPath);

            for(const file of files) {
                const filePath = path.join(commitPath, file);
                const fileContent = await fs.readFile(filePath);
                const params = {
                    Bucket: S3_BUCKET,
                    Key: path.join("commits", commitDir, file),
                    Body: fileContent
                };
                await s3.upload(params).promise();
            }
        }
        // After uploading all files, we can remove the local commit directory
        await fs.rmdir(commitsPath, { recursive: true });
        console.log("All changes pushed to the S3 bucket successfully.");
    } catch (err) {
        console.error("Error pushing changes to the S3 : ", err);
    }
}