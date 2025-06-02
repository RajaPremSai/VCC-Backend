const mongoose = require("mongoose");
const { required } = require("yargs");
const { Schema } = mongoose;

const RepositorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  content: [{ type: String }],
  visibility: {
    type: Boolean,
  },
  owner: {
    type: Schema,
    ref: "User",
    required: true,
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
});

const Repository = mongoose.model("Repository", RepositorySchemas);
export default Repository;
