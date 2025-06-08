const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createRepo(req, res) {
  const { owner, name, issues, content, description, visibility } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Repo name is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const newRepository = new Repository({
      name,
      description,
      visibility,
      owner,
      content,
      issues,
    });

    const result = await newRepository.save();
    res.status(201).json({
      message: "Repository created!",
      repositoryID: result._id,
    });
  } catch (err) {
    console.log("Error : ", err.message);
    res.status(500).send("Internal Server Error");
  }
}

async function getAllRepos(req, res) {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issues");

    res.json(repositories);
  } catch (err) {
    console.log("Error during repository : ", err.message);
    res.status(500).send("Server Error");
  }
}

async function fetchRepoById(req, res) {
  const repoID = req.params.id;
  try {
    const repositories = await Repository.findById({ _id: repoID })
      .populate("issues")
      .populate("owner");

    res.json(repositories);
  } catch (err) {
    console.log("Error during finding repositories : ", err.message);
    res.status(500).send("Server Error");
  }
}

async function fetchRepoByName(req, res) {
  const repoName = req.params.name;
  try {
    const repository = await Repository.find({ name: repoName })
      .populate("owner")
      .populate("issues");

    res, json(repository);
  } catch (err) {
    console.log("Error during finding repositories : ", err.message);
    res.status(500).send("Server Error");
  }
}

async function fetchRepoForCurrentUser(req, res) {
  res.send("Repo fpr logged in user fetched");
}

async function updateRepoById(req, res) {
  res.send("Updated Repo");
}

async function deleteRepoById(req, res) {
  res.end("Repository deleted");
}

async function toggleVisibilityById(req, res) {
  res.send("Changed visibility");
}

module.exports = {
  createRepo,
  getAllRepos,
  fetchRepoById,
  fetchRepoByName,
  fetchRepoForCurrentUser,
  updateRepoById,
  deleteRepoById,
  toggleVisibilityById,
};
