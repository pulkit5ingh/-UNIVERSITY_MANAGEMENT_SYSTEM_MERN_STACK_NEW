import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const StudentMarksTable = () => {

    // * ==== get user state 
    const adminLogin = useSelector((state) => state.adminLogin)
    const { error, userInfo, message } = adminLogin;

    const [studentMarks, setStudentMarks] = useState([])

    // * Get All Students
    const getAlMarksbyStudentId = async () => {
        try {
            const data = await axios.get(
                `http://localhost:5000/api/marks_by_student/${userInfo._id}`,
            )
            setStudentMarks(data.data.response)
        } catch (error) {
        }
    }

    useEffect(() => {
        getAlMarksbyStudentId();
    }, [])

    return (
        <div className="table-container">
            <table>
                <tr>
                    <th>Course Name</th>
                    <th>Teacher name</th>
                    <th>Student name</th>
                    <th>Attendance Marks</th>
                    <th>Mid Term Marks</th>
                    <th>Final Term Marks</th>
                </tr>
                {studentMarks.map((studentMark, key) => {
                    return (
                        <tr>
                            <td>{studentMark.course_id.course_name}</td>
                            <td>{studentMark.teacher_id.teacher_first_name}</td>
                            <td>{studentMark.student_id.student_first_name}</td>
                            <td>{studentMark.attendance_marks}</td>
                            <td>{studentMark.midterm_marks}</td>
                            <td>{studentMark.final_marks}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default StudentMarksTable
