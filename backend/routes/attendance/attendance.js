import express from "express";
const router = express.Router();

// * =======================================================================================//

import {
    getAllTeacherAttendance,
    getAllStudentAttendance,
    createAttendance,
} from "../../controllers/attendance/attendanceController.js";

// *=======================================================================================//

router.route("/attendance").post(createAttendance);

// * =======================================================================================//

router.route("/teachers_attendance/:id").get(getAllTeacherAttendance);

// *=======================================================================================//

router.route("/students_attendance/:id").get(getAllStudentAttendance);

// *=======================================================================================//

export default router;