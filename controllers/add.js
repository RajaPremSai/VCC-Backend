const fs=require("fs").promises;
const path = require("path");

async function addRepo(filePath){
    console.log("Adding a file to the repository...");
    const repoPath = path.resolve(process.cwd(), ".premGit");
    const stagingPath = path.join(repoPath,"staging");

    try{
        await fs.mkdir(stagingPath, { recursive: true });
        const fileName=path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagingPath, fileName));

        console.log(`${fileName} added to the repository successfully.`);

    }catch(err){
        console.log("Error adding file to repository:", err);
    }
}

module.exports = {addRepo};