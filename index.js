const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
// Importing the controllers for different git operations
// This file sets up the command line interface for the git-like functionality
const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");
const { commitRepo } = require("./controllers/commit.js");
const { pushRepo } = require("./controllers/push.js");
const { pullRepo } = require("./controllers/pull.js");
const { revertRepo } = require("./controllers/revert.js");

yargs(hideBin(process.argv))
  .command("init", "Initialize the project", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
        //   demandOption: true,
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  ) 
  .command(
    "commit <message>",
    "Commit the staged files with a message",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv)=>{
      commitRepo(argv.message);
    }
  )
  .command("push", "Push changes to the remote repository", {}, pushRepo)
  .command("pull", "Pull changes from the remote repository", {}, pullRepo)
  .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Commit hash to revert to",
        type: "string",
        demandOption: true,
      });
    },
    (argv)=>{
      revertRepo(argv.message)
    }
  )
  .demandCommand(1, "You need at least one command before moving on")
  .help().argv;
