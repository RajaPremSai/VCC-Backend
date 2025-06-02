const createRepo = (req, res) => {
  res.send("Repository create");
};

const getAllRepos = (req, res) => {
  res.send("Repositories feteched");
};

const fetchRepoById = (req, res) => {
  res.send("Repository fetched");
};

const fetchRepoByName = (req, res) => {
  res.send("Repository fetched");
};

const fetchRepoForCurrentUser = (req, res) => {
  res.send("Repo fpr logged in user fetched");
};

const updateRepoById = (req, res) => {
  res.send("Updated Repo");
};

const deleteRepoById = (req, res) => {
  res.end("Repository deleted");
};

const toggleVisibilityById = (req, res) => {
  res.send("Changed visibility");
};


module.exports={
    createRepo,
    getAllRepos,
    fetchRepoById,
    fetchRepoByName,
    fetchRepoForCurrentUser,
    updateRepoById,
    deleteRepoById,
    toggleVisibilityById,

}