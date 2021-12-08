import asyncHandler from "express-async-handler";
import MarksModel from "../../models/marks/marks.js";

// * =========================================================== //

// * @desc    Fetch all items
// * @route   GET /api/items
// * @access  Public
const getAllMarks = asyncHandler(async (req, res) => {

    try {
        const data = await MarksModel.find({})
            .sort("-createdAt")

        res.status(201).json({
            status: "success",
            message: "all students",
            response: data,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "students not found",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    Create a student
// * @route   POST /api/student
// * @access  Private/Admin
const createMarks = asyncHandler(async (req, res) => {

    // * required array
    let required = [];

    // * check required fields !
    if (required.length === 0) {

        console.log(req.body)

        const {
            course_id,
            teacher_id,
            student_id,
            attendance_marks,
            midterm_marks,
            final_marks,
        } = req.body;

        try {
            const newMarksModel = new MarksModel({
                course_id,
                teacher_id,
                student_id,
                attendance_marks,
                midterm_marks,
                final_marks,
            });

            const data = await newMarksModel.save();
            res.status(201).json({
                status: "success",
                message: "student added succesfully",
                response: data,
            });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: "something went wrong",
                response: error,
            });
        }

    } else {
        // * mapping the required array list
        let message = required.map((item) => {
            return " " + item;
        });
        res.json({
            status: "fail",
            message: "Following fields are required - " + message,
            response: [],
        });
    }
});

// * =========================================================== //

const getMarksByTeacher = asyncHandler(async (req, res) => {

    // * required array
    let required = [];

    // * check required fields !
    if (required.length === 0) {

        const {
            teacher_id,
        } = req.params;

        try {

            let data = await MarksModel.find({
                teacher_id
            })
                .populate("course_id")
                .populate("teacher_id")
                .populate("student_id")

            res.status(201).json({
                status: "success",
                message: "student added succesfully",
                response: data,
            });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: "something went wrong",
                response: error,
            });
        }

    } else {
        // * mapping the required array list
        let message = required.map((item) => {
            return " " + item;
        });
        res.json({
            status: "fail",
            message: "Following fields are required - " + message,
            response: [],
        });
    }
});

// * =========================================================== //

const getMarksByStudent = asyncHandler(async (req, res) => {

    // * required array
    let required = [];

    // * check required fields !
    if (required.length === 0) {

        const {
            student_id,
        } = req.params;

        console.log(req.params)

        try {

            let data = await MarksModel.find({
                student_id
            })
                .populate("course_id")
                .populate("teacher_id")
                .populate("student_id")

            res.status(201).json({
                status: "success",
                message: "student succesfully",
                response: data,
            });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: "something went wrong",
                response: error,
            });
        }

    } else {
        // * mapping the required array list
        let message = required.map((item) => {
            return " " + item;
        });
        res.json({
            status: "fail",
            message: "Following fields are required - " + message,
            response: [],
        });
    }
});

// * =========================================================== //

export {
    getAllMarks,
    createMarks,
    getMarksByTeacher,
    getMarksByStudent
};

// * =========================================================== //
