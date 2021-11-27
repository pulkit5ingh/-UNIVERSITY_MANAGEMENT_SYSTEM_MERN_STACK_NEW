import mongoose from "mongoose";

const Schema = mongoose.Schema;

const marksSchema = new mongoose.Schema(
    {
        // * ok ============================

        // * ok
        course_id: {
            type: String,
            required: true,
        },

        // * ok
        teacher_id: {
            type: String,
            required: true,
        },

        // * ok
        student_id: {
            type: String,
            required: true,
        },

        attendance_marks: {
            type: Number,
            default: null
        },

        midterm_marks: {
            type: Number,
            default: null
        },

        final_marks: {
            type: Number,
            default: null
        },

        // * ok
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Marks = mongoose.model("Marks", marksSchema);

export default Marks;