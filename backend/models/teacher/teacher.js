import mongoose from "mongoose";

const Schema = mongoose.Schema;

const teacehrSchema = new mongoose.Schema(
    {
        // * ok ============================

        // * ok
        teacher_first_name: {
            type: String,
            required: true,
        },

        // * ok
        teacher_last_name: {
            type: String,
            required: true,
        },

        // * ok
        teacher_cnic: {
            type: String,
            required: true,
        },

        // * ok
        teacher_email: {
            type: String,
            required: true,
        },

        // * ok
        teacher_qualification: {
            type: String,
            required: true,
        },

        // * ok
        teacher_university_name: {
            type: String,
            required: true,
        },

        // * ok
        teacher_cgpa: {
            type: String,
            required: true,
        },

        // * ok
        teacher_phone_number: {
            type: String,
            required: true,
        },

        // * ok
        teacher_domicile: {
            type: String,
            required: true,
        },

        // * ok
        teacher_gender: {
            type: String,
            required: true,
        },

        // * ok
        teacher_password: {
            type: String,
            required: true,
        },

        // * ok
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Teacehr = mongoose.model("Teacehr", teacehrSchema);

export default Teacehr;