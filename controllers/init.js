const fs = require("fs").promises;
const path = require("path");

async function initRepo() {
  // console.log("Initializing the repository...");
  // Here you would implement the logic to initialize the repository.
  const repoPath = path.resolve(process.cwd(), ".premGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitsPath, { recursive: true });
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({bucket: process.env.S3_BUCKET})
    );
    console.log("Repository initialized successfully.");
  } catch (err) {
    if (err.code === "ENOENT") {
      // If the directory does not exist, create it
      await fs.mkdir(repoPath, { recursive: true });
      await fs.mkdir(commitsPath, { recursive: true });
      console.log("Repository initialized successfully.");
    } else {
      console.error("Error initializing repository:", err);
    }
  }
}

module.exports = { initRepo };
