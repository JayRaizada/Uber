import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters"],
    },
    lastName: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "email must be at least 5 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passowrd);
};

userSchema.statics.hashPassword = async function (passowrd) {
  return await bcrypt.hash(passowrd, 10);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
