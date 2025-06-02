const express = require("express");
const issueController = require("../controllers/issueController");

const issueRouter = express.Router();

issueRouter.post("/issueRoutissueer/create", repoController.createRepo);
issueRouter.get("/repo/all", repoController.getAllRepos);
issueRouter.get("/repo/:id", repoController.fetchRepoById);
issueRouter.post("/repo/:name", repoController.fetchRepoByName);
issueRouter.get("/repo/:userID", repoController.fetchRepoForCurrentUser);
issueRouter.put("/repo/:id", repoController.updateRepoById);
issueRouter.delete("/repo/:id", repoController.deleteRepoById);
issueRouter.patch("/repo/toggle/:id", repoController.toggleVisibilityById);

module.exports = issueRouter;
