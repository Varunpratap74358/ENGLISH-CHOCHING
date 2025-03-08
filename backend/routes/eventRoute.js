import express from "express";
import { isAuthenticated } from "../middelware/auth.js";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getOneEvent,
} from "../controller/eventsController.js";
import upload from "../middelware/multer.js";

const router = express.Router();

router.post("/add", isAuthenticated, upload.single("file"), addEvent);
router.delete("/delete/:id", isAuthenticated, deleteEvent);
router.get("/all", getAllEvents);
router.get("/event/:id",getOneEvent)

export default router;
