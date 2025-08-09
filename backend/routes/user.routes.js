
import express from "express";
import {
  getCurrentUser,
  updateAssistant,
  askToAssistant, //  included here
} from "../controllers/user.controllers.js"; //  corrected filename

import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

// Get logged-in user
userRouter.get("/current", isAuth, getCurrentUser);

// Update assistant info (with image upload)
userRouter.post("/update", isAuth, upload.single("assistantImage"), updateAssistant);

// Ask the assistant
userRouter.post("/asktoassistant", isAuth, askToAssistant);

export default userRouter;




