const mongoose = require("mongoose");

const { Schema } = mongoose;

const refreshTokenSchema = Schema(
  {
    token: { type: String, require: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  },
  { timestamp: true }
);
