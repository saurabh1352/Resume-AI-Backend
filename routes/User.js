import express from "express";

import {
  login, register,ProfileSummaryAiWriter, WorkSummary, GetUserData

} from "../controller/User.js";
import { isAuthenticated } from "../middleware/auth.js";


export const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/register").post(register);
userRouter.route("/summary").post(isAuthenticated,ProfileSummaryAiWriter);
userRouter.route("/workSummary").post(isAuthenticated,WorkSummary);
userRouter.route("/getuserdata").post( isAuthenticated,GetUserData);

// userRouter.route("/logout").get("");

// userRouter.route("/user").get(getUser);

// userRouter.route("/me").get(isAuthenticated, myProfile);

// userRouter.route("/admin/update").put(isAuthenticated, updateUser);

// userRouter.route("/admin/timeline/add").post(isAuthenticated, addTimeline);
// userRouter.route("/admin/youtube/add").post(isAuthenticated, addYoutube);
// userRouter.route("/admin/project/add").post(isAuthenticated, addProject);

// userRouter.route("/admin/timeline/:id").delete(isAuthenticated, deleteTimeline);
// userRouter.route("/admin/youtube/:id").delete(isAuthenticated, deleteYoutube);
// userRouter.route("/admin/project/:id").delete(isAuthenticated, deleteProject);

// userRouter.route("/contact").post(contact);
