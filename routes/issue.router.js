const express = require("express");
const issueController = require("../controllers/issueController");

const issueRouter = express.Router();

issueRouter.post("/issue/create", issueController.createIssue);
issueRouter.get("/issue/all", issueController.getAllIssues);
issueRouter.get("/issue/:id", issueController.getIssueById);
issueRouter.put("/issue/:id", issueController.updateIssueById);
issueRouter.delete("/issue/:id", issueController.deleteIssueById);

module.exports = issueRouter;
