import express from "express";
const router = express.Router();

// * =======================================================================================//

import {
    createMarks,
    getAllMarks,
    getMarksByTeacher,
    getMarksByStudent,
    deleteMarks,
    updateMarks,
    getMarks
} from "../../controllers/marks/marksController.js";

// *=======================================================================================//

router.route("/marks").post(createMarks);

// * =======================================================================================//

router.route("/marks/:id").get(getMarks);

// * =======================================================================================//

router.route("/marks").get(getAllMarks);

// * =======================================================================================//

router.route("/marks_by_teacher/:teacher_id").get(getMarksByTeacher);

// * =======================================================================================//

router.route("/marks_by_student/:student_id").get(getMarksByStudent);

// * =======================================================================================//

router.route("/delete_marks").post(deleteMarks);

// * =======================================================================================//

router.route("/update_marks").put(updateMarks);

// * =======================================================================================//

export default router;