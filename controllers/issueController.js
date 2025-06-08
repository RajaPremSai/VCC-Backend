const mongoose = require("mongoose");
const User = require("../models/repoModel");
const Issue = require("../model/issueModel");
const Repository = require("../models/repoModel");

async function createIssue(req, res) {
  const { title, description } = req.body;
  const { id } = req.params;

  try {
    const issue = new Issue({
      title,
      description,
      repository: id,
    });

    await issue.save();

    res.status(201).json(issue);
  } catch (err) {
    console.log("Error during issue creation: ", err.message);
    res.status(500).json({ "Server Error": err.message });
  }
}

async function updateIssueById(req, res) {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    issue.title = title;
    issue.description = description;
    issue.status = status;

    await issue.save();
    res.json(issue);
  } catch (err) {
    console.error("Error during updating issue: ", err.message);
    res.status(500).json({ "Server Error": err.message });
  }
}

async function deleteIssueById(req, res) {
  const { id } = req.params;
  try {
    const issue = Issue.findByIdAndDelete(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.json({ message: "Issue deleted" });
  } catch (err) {
    console.error("Error during issue updation : ", err.message);
    res.status(500).send("Server Error");
  }
}

async function getAllIssues(req, res) {
  const { id } = req.params;
  try {
    const issues = Issue.find({ repository: id });

    if (!issues) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.status(200).json(issues);
  } catch (err) {
    console.err("Error during issue fetching : ", err.message);
    res.status(500).send("Server error");
  }
}

async function getIssueById(req, res) {
  const { id } = req.params;
  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found!" });
    }

    issue.title = title;
    issue.description = description;
    issue.status = status;

    await issue.save();

    res.json(issue, { message: "Issue Updated" });
    
  } catch (err) {
    console.error("Error during issue updation : ", err.message);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
