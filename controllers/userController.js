const getAllUsers = (req, res) => {
  res.send("All users fetched");
};

const signup = (req, res) => {
  res.send("Signing Up!!");
};

const login = (req, res) => {
  res.send("logging Up!!");
};

const getUserProfile = (req, res) => {
  res.send("Profile fetched!!");
};

const updateUserProfile = (req, res) => {
  res.send("Profile Updated");
};

const deleteUserProfile = (req, res) => {
  res.send("Profile deleted");
};

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
