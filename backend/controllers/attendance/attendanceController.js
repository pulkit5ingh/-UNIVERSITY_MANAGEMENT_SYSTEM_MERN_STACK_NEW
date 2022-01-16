import asyncHandler from "express-async-handler";
import AttendanceModel from "../../models/attendance/attendance.js";

// * @desc    Fetch single student
// * @route   GET /api/student
// * @access  Public
const getAllTeacherAttendance = asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log(id)

    try {
        const data = await AttendanceModel.find({ attendance_teacher: req.params.id })
            .populate("attendance_student")
            .populate("attendance_teacher")
            .sort("-createdAt")

        res.status(201).json({
            status: "success",
            message: "course",
            response: data,
        });

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "course not found",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    Fetch single student
// * @route   GET /api/student
// * @access  Public
const getAttendance = asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log(id)

    try {
        const data = await AttendanceModel.findById({ _id: req.params.id })
            .populate("attendance_student")
            .populate("attendance_teacher")
            .sort("-createdAt")

        res.status(201).json({
            status: "success",
            message: "course",
            response: data,
        });

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "course not found",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    Fetch single student
// * @route   GET /api/student
// * @access  Public
const getAllStudentAttendance = asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log(id)

    try {
        const data = await AttendanceModel.find({ attendance_student: req.params.id })
            .populate("attendance_student")
            .populate("attendance_teacher")
            .sort("-createdAt")

        res.status(201).json({
            status: "success",
            message: "course",
            response: data,
        });

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "course not found",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    Create a student
// * @route   POST /api/student
// * @access  Private/Admin
const createAttendance = asyncHandler(async (req, res) => {

    // * required array
    let required = [];

    if (!req.body.attendance_teacher)
        required.push("attendance_teacher");
    if (!req.body.attendance_student)
        required.push("attendance_student");
    if (!req.body.attendance_no_of_classes)
        required.push("attendance_no_of_classes");

    // * check required fields !
    if (required.length === 0) {

        console.log(req.body)

        const {
            attendance_teacher,
            attendance_student,
            attendance_no_of_classes,
        } = req.body;

        try {
            const newAttendanceModel = new AttendanceModel({
                attendance_teacher,
                attendance_student,
                attendance_no_of_classes,
            });

            const data = await newAttendanceModel.save();

            console.log("ATTENDANCE CREATED ! ", data)

            res.status(201).json({
                status: "success",
                message: "Attendance added succesfully",
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

// * @desc    delete a teacher
// * @route   DELETE /api/teacher
// * @access  Private/Admin
const deleteAttendance = asyncHandler(async (req, res) => {
    const { id } = req.body;

    let Attendance = await AttendanceModel.findOneAndDelete({ _id: id })

    if (Attendance) {

        console.log("Attendance DELETED SUCCESFULLY !")
        res.json({
            status: "success",
            message: "Attendance removed",
            response: null
        });
    } else {
        res.status(404);
        res.json({
            status: "fail",
            message: "something went wrong",
            response: null
        });
    }
});

// * =========================================================== //

// * @desc    delete a teacher
// * @route   DELETE /api/teacher
// * @access  Private/Admin
const updateAttendance = asyncHandler(async (req, res) => {
    const { id } = req.body;

    let Attendance = await AttendanceModel.findOneAndUpdate({ _id: id }, req.body, { new: true })

    if (Attendance) {

        console.log("Attendance Updated SUCCESFULLY !")
        res.json({
            status: "success",
            message: "Attendance Updated",
            response: null
        });
    } else {
        res.status(404);
        res.json({
            status: "fail",
            message: "something went wrong",
            response: null
        });
    }
});

// * =========================================================== //

export {
    getAllTeacherAttendance,
    getAllStudentAttendance,
    createAttendance,
    deleteAttendance,
    updateAttendance,
    getAttendance
};

// * =========================================================== //
