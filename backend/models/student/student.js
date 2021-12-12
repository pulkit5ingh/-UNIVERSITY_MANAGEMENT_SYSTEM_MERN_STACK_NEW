import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema(
    {
        // * ok ============================

        // * ok
        student_first_name: {
            type: String,
            required: true,
        },

        // * ok
        student_last_name: {
            type: String,
            required: true,
        },

        // * ok
        student_cnic: {
            type: String,
            required: true,
        },

        // * ok
        student_email: {
            type: String,
            required: true,
        },

        // * ok
        student_inter_marks: {
            type: String,
            required: true,
        },

        // * ok
        student_gender: {
            type: String,
            required: true,
        },

        // * ok
        student_phone_number: {
            type: String,
            required: true,
        },

        // * ok
        student_domicile: {
            type: String,
            required: true,
        },

        // * ok
        student_password: {
            type: String,
            required: true,
        },

        // * ok
        is_student: {
            type: Boolean,
            default: true,
        },

        // * ok
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;