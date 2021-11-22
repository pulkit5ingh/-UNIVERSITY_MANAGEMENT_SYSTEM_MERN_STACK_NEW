import asyncHandler from "express-async-handler";
import StudentModel from "../../models/student/student.js";

// * =========================================================== //

// * @desc    Fetch all items
// * @route   GET /api/items
// * @access  Public
const getAllStudents = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;

    try {
        const count = await StudentModel.countDocuments();

        const data = await StudentModel.find({})
            .sort({ date: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        res.status(201).json({
            status: "success",
            message: "all students",
            response: data,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
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
    const { id } = req.params;

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

// * @desc    delete a student
// * @route   DELETE /api/student
// * @access  Private/Admin
const deleteStudent = asyncHandler(async (req, res) => {
    const student = await StudentModel.findById(req.params.id);

    if (student) {
        await student.remove();
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

export {
    getAllStudents,
    getStudent,
    deleteStudent,
    createStudent,
    updateStudent,
};

// * =========================================================== //
