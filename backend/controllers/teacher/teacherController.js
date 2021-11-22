import asyncHandler from "express-async-handler";
import TeacherModel from "../../models/teacher/teacher.js";

// * =========================================================== //

// * @desc    Fetch all teacher
// * @route   GET /api/teacher
// * @access  Public
const getAllTeachers = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;

    try {
        const count = await TeacherModel.countDocuments();

        const data = await TeacherModel.find({})
            .sort("-createdAt")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        res.status(201).json({
            status: "success",
            message: "all teachers",
            response: data,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "teachers not found",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    Fetch single teacher
// * @route   GET /api/teacher
// * @access  Public
const getTeacher = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const data = await TeacherModel.findById({ _id: id });

        res.status(201).json({
            status: "success",
            message: "teacher",
            response: data,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "teacher not found",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    Create a teacher
// * @route   POST /api/teacher
// * @access  Private/Admin
const createTeacher = asyncHandler(async (req, res) => {

    // * required array
    let required = [];

    if (!req.body.teacher_first_name)
        required.push("teacher_first_name");
    if (!req.body.teacher_last_name)
        required.push("teacher_last_name");
    if (!req.body.teacher_cnic)
        required.push("teacher_cnic");
    if (!req.body.teacher_email)
        required.push("teacher_email");
    if (!req.body.teacher_qualification)
        required.push("teacher_qualification");
    if (!req.body.teacher_university_name)
        required.push("teacher_university_name");
    if (!req.body.teacher_cgpa)
        required.push("teacher_cgpa");
    if (!req.body.teacher_phone_number)
        required.push("teacher_phone_number");
    if (!req.body.teacher_domicile)
        required.push("teacher_domicile");
    if (!req.body.teacher_gender)
        required.push("teacher_gender");
    if (!req.body.teacher_password)
        required.push("teacher_password");

    // * check required fields !
    if (required.length === 0) {

        console.log(req.body)

        const {
            teacher_first_name,
            teacher_last_name,
            teacher_cnic,
            teacher_email,
            teacher_qualification,
            teacher_university_name,
            teacher_cgpa,
            teacher_phone_number,
            teacher_domicile,
            teacher_gender,
            teacher_password
        } = req.body;

        try {
            const newTeacherModel = new TeacherModel({
                teacher_first_name,
                teacher_last_name,
                teacher_cnic,
                teacher_email,
                teacher_qualification,
                teacher_university_name,
                teacher_cgpa,
                teacher_phone_number,
                teacher_domicile,
                teacher_gender,
                teacher_password
            });

            const data = await newTeacherModel.save();
            res.status(201).json({
                status: "success",
                message: "teacher added succesfully",
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

// * @desc    Update a teacher
// * @route   PUT /api/teacher/:id
// * @access  Private/Admin
const updateTeacher = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const data = await TeacherModel.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(201).json({
            status: "success",
            message: "teacher updated",
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

// * @desc    delete a teacher
// * @route   DELETE /api/teacher
// * @access  Private/Admin
const deleteTeacher = asyncHandler(async (req, res) => {
    const teacher = await TeacherModel.findById(req.params.id);

    if (teacher) {
        await teacher.remove();
        res.json({
            status: "success",
            message: "teacher removed",
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
    getAllTeachers,
    getTeacher,
    deleteTeacher,
    createTeacher,
    updateTeacher,
};

// * =========================================================== //






