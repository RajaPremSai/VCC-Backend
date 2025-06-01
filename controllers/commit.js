const fs=require("fs").promises;
const path = require("path");
const {v4:uuidv4} = require("uuid");


async function commitRepo(message){
    console.log("Committing changes with message:", message);
    const repoPath = path.resolve(process.cwd(), ".premGit");
    const stagingPath = path.join(repoPath, "staging");
    const commitsPath = path.join(repoPath, "commits");

    try{
        const commitID=uuidv4();
        const commitDir=path.join(commitsPath, commitID);
        await fs.mkdir(commitDir,{recursive: true});

        const files = await fs.readdir(stagingPath);
        if(files.length===0){
            console.log("No files to commit.");
            return;
        }
        // const commitData = {
        //     message: message,
        //     files: []
        // };
        for(const file of files){
            const filePath = path.join(stagingPath, file);
            const destPath = path.join(commitDir, file);
            await fs.copyFile(filePath, destPath);
            // commitData.files.push(file);
        }
        // Save commit metadata
        await fs.writeFile(path.join(commitDir,"commit.json"),JSON.stringify({
            message: message,
            files: files,
            commitID: commitID,
            timestamp: new Date().toISOString()
        }, null, 2));

        // Clear the staging area
        await fs.rm(stagingPath, { recursive: true, force: true });
        console.log(`Changes committed successfully with ID: ${commitID} - ${message}`);


    }catch(err){
        console.error("Error committing changes:", err);
        return;
    }
}

module.exports = {commitRepo};