
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema(
    {
        // * ok
        course_name: {
            type: String,
            required: true,
        },

        // * ok
        course_desc: {
            type: String,
            required: true,
        },

        // * ok
        course_year: {
            type: Number,
            required: true,
        },

        // * ok
        course_semester: {
            type: Number,
            required: true,
        },

        // * ok
        course_assigned_teacher: {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
            default: null
        },

        // * ok
        course_assigned_students: [
            {
                type: Schema.Types.ObjectId,
                ref: "Student",
                default: null
            }
        ],

        // * ok
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
