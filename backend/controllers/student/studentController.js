import asyncHandler from "express-async-handler";
import StudentModel from "../../models/student/student.js";
import MarksModel from "../../models/marks/marks.js";
import AttendanceModel from "../../models/attendance/attendance.js";
import CourseModel from "../../models/course/course.js";
import generateToken from '../../configs/jwt/generateToken.js'

// * =========================================================== //

// * @desc    Fetch all items
// * @route   GET /api/items
// * @access  Public
const getAllStudents = asyncHandler(async (req, res) => {

    try {
        const data = await StudentModel.find({})
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

// * @desc    Fetch single student
// * @route   GET /api/student
// * @access  Public
const getStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const data = await StudentModel.findById({ _id: id });

        res.status(201).json({
            status: "success",
            message: "Student",
            response: data,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "student not found",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    Create a student
// * @route   POST /api/student
// * @access  Private/Admin
const createStudent = asyncHandler(async (req, res) => {


    // * required array
    let required = [];

    if (!req.body.student_first_name)
        required.push("student_first_name");
    if (!req.body.student_last_name)
        required.push("student_last_name");
    if (!req.body.student_cnic)
        required.push("student_cnic");
    if (!req.body.student_email)
        required.push("student_email");
    if (!req.body.student_inter_marks)
        required.push("student_inter_marks");
    if (!req.body.student_gender)
        required.push("student_gender");
    if (!req.body.student_phone_number)
        required.push("student_phone_number");
    if (!req.body.student_domicile)
        required.push("student_domicile");
    if (!req.body.student_password)
        required.push("student_password");

    // * check required fields !
    if (required.length === 0) {

        console.log(req.body)

        const {
            student_first_name,
            student_last_name,
            student_cnic,
            student_email,
            student_inter_marks,
            student_gender,
            student_phone_number,
            student_domicile,
            student_password,
        } = req.body;

        try {
            const newStudentModel = new StudentModel({
                student_first_name,
                student_last_name,
                student_cnic,
                student_email,
                student_inter_marks,
                student_gender,
                student_phone_number,
                student_domicile,
                student_password,
            });

            const data = await newStudentModel.save();
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

// * @desc    Update a student
// * @route   PUT /api/students/:id
// * @access  Private/Admin
const updateStudent = asyncHandler(async (req, res) => {
    const { id } = req.body;

    console.log(req.body)
    try {
        const data = await StudentModel.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(201).json({
            status: "success",
            message: "Student updated",
            response: data,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "something went wrong",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    post a student
// * @route   DELETE /api/student
// * @access  Private/Admin
const deleteStudent = asyncHandler(async (req, res) => {

    const { id } = req.body;

    await MarksModel.findOneAndDelete({ student_id: id })
    await AttendanceModel.findOneAndDelete({ attendance_student: id })

    let findCourse = await CourseModel.find({ course_assigned_students: id })

    await Promise.all(
        findCourse.map(async (element) => {

            await CourseModel.findOneAndUpdate({ _id: element._id },
                { $pull: { course_assigned_students: id } },
                {
                    new: true,
                    runValidators: true,
                })
        }))

    let student = await StudentModel.findOneAndDelete({ _id: id })

    if (student) {

        console.log("STUDENT DELETED SUCCESFULLY !")
        res.json({
            status: "success",
            message: "Student removed",
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

// * @desc    Auth admin & get token
// * @route   POST /api/admin/login
// * @access  Public
const authStudent = asyncHandler(async (req, res) => {

    // * required array
    let required = [];

    if (!req.body.student_cnic)
        required.push("student_cnic");
    if (!req.body.student_password)
        required.push("student_password");

    // * check required fields !
    if (required.length === 0) {

        console.log(req.body)

        const { student_cnic, student_password } = req.body

        const student = await StudentModel.findOne({ student_cnic, student_password })

        if (student) {
            res.json({
                status: "success",
                response: {
                    _id: student._id,
                    student_first_name: student.student_first_name,
                    student_last_name: student.student_last_name,
                    student_email: student.student_email,
                    student_cnic: student.student_cnic,
                    is_admin: false,
                    is_student: true,
                    token: generateToken(student._id),
                },
                message: "Authentication Succesfull"
            })
        } else {
            res.status(401).json({
                status: "fail",
                response: null,
                message: "Invalid email or password"
            })
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
})

// * =========================================================== //

export {
    getAllStudents,
    getStudent,
    deleteStudent,
    createStudent,
    updateStudent,
    authStudent
};

// * =========================================================== //
