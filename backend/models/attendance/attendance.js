
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const attendanceSchema = new mongoose.Schema(
    {
        // * ok
        attendance_teacher: {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
            default: null
        },

        // * ok
        attendance_student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            default: null
        },

        // * ok
        attendance_no_of_classes: {
            type: Number,
            required: true,
        },

    },
    { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
