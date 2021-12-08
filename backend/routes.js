import express from "express";
const router = express.Router();

// * import routes

import Admin from "./routes/admin/admin.js";
import Student from "./routes/student/student.js";
import Teacher from "./routes/teacher/teacher.js";
import Course from "./routes/course/course.js";
import Attendance from "./routes/attendance/attendance.js";
import Marks from "./routes/marks/marks.js";

// * Admin
router.use("/", Admin);

// * Student
router.use("/", Student);

// * Teacher
router.use("/", Teacher);

// * course
router.use("/", Course);

// * Attendance
router.use("/", Attendance);

// * Marks
router.use("/", Marks);

// * DELETE ALL
// router.use("/", require("./routes/delete/client_user_delete_all"));

export default router;
