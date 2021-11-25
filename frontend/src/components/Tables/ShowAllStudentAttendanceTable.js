import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowAllStudentAttendanceTable = () => {

    const [attendances, setAttendances] = useState([])
    const [loading, setLoading] = useState(true)

    // * ========================

    // * Get ALl Attendance of this teacher
    const getAllStudentAttendance = async (year, semester) => {

        try {
            const data = await axios.get(
                `http://localhost:5000/api/students_attendance/619d30c606e2a9aac05afb62`,
            )
            setAttendances(data.data.response)
            setLoading(false)
        } catch (error) {
            // alert(error)
        }
    }

    useEffect(() => {
        getAllStudentAttendance();
    }, [])

    return (
        <div className="table-container">
            {/* <Link className="add-btn" to="/admin/add-student">COURSES</Link> */}

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

export default ShowAllStudentAttendanceTable
