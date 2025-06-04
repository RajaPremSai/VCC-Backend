const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
var ObjectId = require("mongodb").ObjectId;

dotenv.config();
const uri = process.env.MONGODB_URI;

let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
}

async function getAllUsers(req, res) {
  try {
    await connectClient();
    const db = client.db("premgithubclone");
    const usersCollection = db.collection("users");

    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (err) {
    console.log("Error : ", err.message);
    res.status(500).send("Server error");
  }
}

async function signup(req, res) {
  const { username, password, email } = req.body;
  try {
    await connectClient();
    const db = client.db("premgithubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
      email,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await usersCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json("token : ", token);
  } catch (err) {
    console.err("Unable to signup : ", err.message);
    res.status(500).send("Server error");
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("premgithubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token, userId: user._id });
  } catch (err) {
    console.log("err : ", err.message);
  }
}

async function getUserProfile(req, res) {
  const currentID = req.params.id;

  try {
    await connectClient();
    const db = client.db("premgithubclone");
    const usersCollection = db.collection("users");
    console.log(currentID);

    const user = await usersCollection.findOne({
      _id: new ObjectId(currentID),
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    res.json({ user: user });
  } catch (Err) {
    console.log("Error during fetching : ", Err.message);
    res.status(500).send("Server error");
  }
}

async function updateUserProfile(req, res) {
  const currentID = req.params.id;
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("premgithubclone");
    const usersCollection = db.collection("users");

    if (!ObjectId.isValid(currentID)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    let updateFields = { email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(currentID) },
      { $set: updateFields },
      {
        returnDocument: "after",
      }
    );

    // In newer MongoDB versions, the result is directly the document
    if (!result) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({
      message: "User updated successfully",
      user: result, // Note: removed .value since result is now the document
    });
  } catch (err) {
    console.error("Error during updating:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function deleteUserProfile(req, res) {
  const currentID = req.params.id;
  const { email } = req.body;

  try {
    await connectClient();
    const db = client.db("premgithubclone");
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(currentID),
    });

    if (result.deleteCount == 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send({ message: "User deleted" });
  } catch (Err) {
    console.log("Error during fetching : ", Err.message);
    res.status(500).send("Server error");
  }
}

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
