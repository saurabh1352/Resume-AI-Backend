import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 name:String,
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    select: false,
  },
});











export const User = mongoose.model("User", userSchema);
