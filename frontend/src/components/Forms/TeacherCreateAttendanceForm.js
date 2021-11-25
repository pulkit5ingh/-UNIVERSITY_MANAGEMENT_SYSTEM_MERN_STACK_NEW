import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import './Form.css'

const TeacherCreateAttendanceForm = () => {

    const [students, setStudents] = useState([])
    const [attendances, setAttendances] = useState([])
    const [loading, setLoading] = useState(true)

    // * ========================

    // * REACT HOOK FORM 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {

        console.log(data)

        let formData = {
            attendance_teacher: "619fbabebd201cf406570743",
            attendance_student: data.student_id,
            attendance_no_of_classes: data.no_of_classes,
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const data = await axios.post(
                'http://localhost:5000/api/attendance',
                formData,
                config
            )

            console.log(data)
            if (data.data.status === "success") {
                window.location.reload(false);
            } else {
            }

        } catch (error) {

        }
    };

    // * Get All Students
    const getAllStudents = async () => {
        try {
            const data = await axios.get(
                `http://localhost:5000/api/students`,
            )
            setStudents(data.data.response)
        } catch (error) {
        }
    }

    // * Get ALl Attendance of this teacher
    const getAllTeacherAttendance = async (year, semester) => {

        try {
            const data = await axios.get(
                `http://localhost:5000/api/teachers_attendance/619fbabebd201cf406570743`,
            )
            setAttendances(data.data.response)
            setLoading(false)
        } catch (error) {
            // alert(error)
        }
    }


    useEffect(() => {
        getAllStudents();
        getAllTeacherAttendance();
    }, [])

    return (
        <div className="table-container">
            {/* <Link className="add-btn" to="/admin/add-student">COURSES</Link> */}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="dashboard-container">
                    <h4>CREATE ATTENDANCE</h4>
                    <div class="row">
                        <div class="column">
                            <label>YEAR</label>
                            <input type="text" value="YOUR NAME " disabled />
                        </div>

                        <div class="column">
                            <label>STUDENT</label>
                            <select name="student_id"
                                {...register("student_id")}
                            >
                                {students.map((student, index) => {
                                    return (
                                        <option value={student._id}>{student.student_first_name}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div class="column">
                            <label>NO OF CLASSES</label>
                            <input
                                name="no_of_classes"
                                {...register("no_of_classes", { required: true })}
                                type="number" />
                            <div className="error">{errors.no_of_classes && <span>This field is required</span>}</div>
                        </div>

                        <div class="column">
                            <input style={{ margin: "20px" }} type="submit" value="ADD" />
                        </div>
                    </div>
                </div>
            </form>


            {loading ?
                <>
                    Loading ....
                </> :
                <>
                    <table>
                        <tr>
                            <th>teacher Name</th>
                            <th>student name</th>
                            <th>no of classes</th>
                            <th>date</th>
                        </tr>
                        {attendances.map((attendance, key) => {
                            return (
                                <tr key={key}>
                                    <td>{attendance.attendance_teacher.teacher_first_name}</td>
                                    <td>{attendance.attendance_student.student_first_name}</td>
                                    <td>{attendance.attendance_no_of_classes}</td>
                                    <td>{attendance.createdAt}</td>
                                </tr>
                            )
                        })}
                    </table>
                </>
            }

        </div>
    )
}

export default TeacherCreateAttendanceForm
