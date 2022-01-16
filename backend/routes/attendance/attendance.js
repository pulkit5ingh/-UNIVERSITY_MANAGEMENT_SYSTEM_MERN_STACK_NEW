import express from "express";
const router = express.Router();

// * =======================================================================================//

import {
    getAllTeacherAttendance,
    getAllStudentAttendance,
    createAttendance,
    deleteAttendance,
    updateAttendance
} from "../../controllers/attendance/attendanceController.js";

// *=======================================================================================//

router.route("/attendance").post(createAttendance);

// * =======================================================================================//

router.route("/teachers_attendance/:id").get(getAllTeacherAttendance);

// *=======================================================================================//

router.route("/students_attendance/:id").get(getAllStudentAttendance);

// *=======================================================================================//

router.route("/delete_attendance").post(deleteAttendance);

// * =======================================================================================//

router.route("/update_attendance").put(updateAttendance);

// * =======================================================================================//

export default router;