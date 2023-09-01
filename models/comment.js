const mongoose = require("mongoose");
const { schema } = require("./blog");

const { Schema } = mongoose;

const commentSchema = new schema(
  {
    content: { type: String, required: true },
    blog: { type: mongoose.SchemaTypes.ObjectId, ref: "blog" },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

module.exports = module.schema("Comment", commentSchema, "comments");
