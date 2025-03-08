import express from "express";
import upload from "../middelware/multer.js";
import {
  getInfo,
  login,
  logout,
  register,
  update,
  updateProfileImage,
} from "../controller/adminController.js";
import { isAuthenticated } from "../middelware/auth.js";

const router = express.Router();

router.post("/register", upload.single("file"), register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/info", getInfo);
router.put("/update", update);
router.put("/update-profile-img", upload.single("file"), updateProfileImage);

export default router;
