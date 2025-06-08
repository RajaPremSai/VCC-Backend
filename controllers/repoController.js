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
  const { repoName } = req.params;
  try {
    const repository = await Repository.find({ repoName })
      .populate("owner")
      .populate("issues");

    res.json(repository);
  } catch (err) {
    console.log("Error during finding repositories : ", err.message);
    res.status(500).send("Server Error");
  }
}

async function fetchRepoForCurrentUser(req, res) {
  const userId = req.user;
  try {
    const repositories = await Repository.find({ owner: userId });

    if (!repositories || repositories.length == 0) {
      return res.status(404).json({ error: "User repos not found" });
    }

    res.json(repositories);
  } catch (err) {
    console.error("Error during fetching repos : ", err.message);
    res.status(500).send("Server error");
  }
}

async function updateRepoById(req, res) {
  const { id } = req.params;
  const { content, description } = req.body;
  try {
    const repository = await Repository.findByIdAndUpdate(id);
    if (!repository) {
      return res.status(404).json({ error: "Repo not found" });
    }
    repository.content.push(content);
    repository.description = description;

    const updatedRepository = await repository.save();
    res.json({
      message: "Repository updated",
      repository: updatedRepository,
    });
  } catch (err) {
    console.error("Error during updating repos : ", err.message);
    res.status(500).send("Server error");
  }
}

async function deleteRepoById(req, res) {
  const id = req.params;
  try {
    const repository = await Repository.findByIdAndDelete(id);
    res.json({ message: "Repository deleted successfully" });
  } catch (err) {
    console.error("Error during deleting repository : ", err.message);
    res.status(500).send("Server error");
  }
}

async function toggleVisibilityById(req, res) {
  const repoID = req.params;
  try {
    const repository = await repository.findById(repoID);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found" });
    }
    repository.visibility = !repository.visibility;
    const updatedRepository = await repository.save();
  } catch (err) {
    console.error("Error during updating repo's visibility: ", err.message);
    res.status(500).send("Server error");
  }
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
