import asyncHandler from "express-async-handler";
import CourseModel from "../../models/course/course.js";

// * =========================================================== //

// * @desc    Fetch all course
// * @route   GET /api/course
// * @access  Public
const getAllCourse = asyncHandler(async (req, res) => {
    // const { year, semester } = req.params;
    console.log(req.params)

    try {
        let year = parseInt(req.params.year);
        let semester = parseInt(req.params.semester);

        const data = await CourseModel.find({
            $and: [
                { course_year: year },
                { course_semester: semester }
            ]
        })
            .sort("-createdAt")

        res.status(201).json({
            status: "success",
            message: "all Courses",
            response: data
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Courses not found",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    Fetch single student
// * @route   GET /api/student
// * @access  Public
const getCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log(id)

    try {
        const data = await CourseModel.findById({ _id: req.params.id })
            .populate("course_assigned_teacher")
            .populate("course_assigned_students")

        console.log(data)

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
const createCourse = asyncHandler(async (req, res) => {


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
const updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const data = await CourseModel.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true,
        })

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

// * @desc    Update a student
// * @route   PUT /api/students/:id
// * @access  Private/Admin
const pushStudentToCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { student_id } = req.body

    console.log(req.body)

    try {

        // * Lets Check if Student is Already in array 

        let findStudent = await CourseModel.findOne({ _id: id });

        console.log("ALL STUDENTS => ", findStudent.course_assigned_students)

        let isStudent = findStudent.course_assigned_students.includes(student_id);

        console.log("IS STUDENT => ", isStudent)

        if (isStudent) {
            res.status(200).json({
                status: "fail",
                message: "student is already present !",
                response: error,
            });
        } else {
            const data = await CourseModel.findByIdAndUpdate({ _id: id },
                { $push: { course_assigned_students: student_id } },
                {
                    new: true,
                    runValidators: true,
                })

            res.status(201).json({
                status: "success",
                message: "Student updated",
                response: data,
            });
        }

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "something went wrong",
            response: error,
        });
    }
});

// * =========================================================== //


// * @desc    Update a student
// * @route   PUT /api/students/:id
// * @access  Private/Admin
const popStudentToCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { student_id } = req.body

    console.log(req.body)

    try {

        const data = await CourseModel.findOneAndUpdate({ _id: id },
            { $pull: { course_assigned_students: student_id } },
            {
                new: true,
                runValidators: true,
            })

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
const deleteCourse = asyncHandler(async (req, res) => {
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
    getAllCourse,
    getCourse,
    deleteCourse,
    createCourse,
    updateCourse,
    pushStudentToCourse,
    popStudentToCourse
};

// * =========================================================== //
