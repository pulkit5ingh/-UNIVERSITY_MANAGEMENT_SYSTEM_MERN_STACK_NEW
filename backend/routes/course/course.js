import express from "express";
const router = express.Router();

// * =======================================================================================//

import {
    getAllCourse,
    getCourse,
    deleteCourse,
    createCourse,
    updateCourse,
} from "../../controllers/course/courseController.js";

// *=======================================================================================//

router.route("/course").post(createCourse);

// * =======================================================================================//

router.route("/courses/:year/:semester").get(getAllCourse);

// *=======================================================================================//

router.route("/course/:id").get(getCourse);

// *=======================================================================================//

router.route("/course/:id").put(updateCourse);

// *=======================================================================================//

router.route("course/:id").delete(deleteCourse);

// *=======================================================================================//

export default router;