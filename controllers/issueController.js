const { model } = require("mongoose");

const createIssue = (req, res) => {
  res.send("Issue created");
};

const updateIssueById = (req, res) => {
  res.send("Issue updated");
};

const deleteIssueById = (req, res) => {
  res.send("Issue updated!");
};

const getAllIssues = (req, res) => {
  res.send("All issues fetched");
};

const getIssueById = (req, res) => {
  res.send("Issue is fetched");
};

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
