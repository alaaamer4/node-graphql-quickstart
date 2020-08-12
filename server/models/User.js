import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Number,
      default: 0,
    },
  },
  { timestamp: true }
);

const User = model("users", userSchema);

export default User;
