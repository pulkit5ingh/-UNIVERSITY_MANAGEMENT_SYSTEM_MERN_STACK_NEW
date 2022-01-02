import express from "express";
const router = express.Router();

// * =======================================================================================//

import {
    getAllStudents,
    getStudent,
    deleteStudent,
    createStudent,
    updateStudent,
    authStudent
} from "../../controllers/student/studentController.js";

// *=======================================================================================//

router.route("/student").post(createStudent);

// * =======================================================================================//

router.route("/students").get(getAllStudents);

// *=======================================================================================//

router.route("/student/:id").get(getStudent);

// *=======================================================================================//

router.route("/student").put(updateStudent);

// *=======================================================================================//

router.route("/delete_student").post(deleteStudent);

// *=======================================================================================//

router.route("/student/login").post(authStudent);

// *=======================================================================================//

export default router;