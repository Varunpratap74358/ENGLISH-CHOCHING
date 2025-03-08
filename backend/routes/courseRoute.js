import express from 'express'
import { addCourse, deleteCourse, getAllCourse } from "../controller/courseController.js";
import { isAuthenticated } from "../middelware/auth.js";
import upload from "../middelware/multer.js";

const router = express.Router()

router.post("/add-course",isAuthenticated,upload.single("file"),addCourse)
router.delete("/delete-course/:id",deleteCourse)
router.get("/all-course",getAllCourse)

export default router