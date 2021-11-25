import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import './Table.css'

const TeacherCourseTable = () => {

    // * Use State
    const [coureses, setCourses] = useState([])

    // * Use params
    let params = useParams();
    let id = params.id;

    const getAllCourses = async () => {

        try {
            const data = await axios.get(
                // `http://localhost:5000/api/teacher_courses${id}`,
                `http://localhost:5000/api/teacher_courses/619fbabebd201cf406570743`,
            )
            console.log(data)
            setCourses(data.data.response)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getAllCourses();
    }, [])

    return (
        <div className="table-container">
            <table>
                <tr>
                    <th>course name</th>
                    <th>course description</th>
                    <th>course year</th>
                    <th>course semester</th>
                    <th>course assigned teacher</th>
                    <th>course assigned students</th>
                </tr>
                {coureses.map((course, key) => {
                    return (
                        <tr key={key}>
                            <td>{course.course_name}</td>
                            <td>{course.course_desc}</td>
                            <td>{course.course_year}</td>
                            <td>{course.course_semester}</td>
                            <td>{course.course_assigned_teacher.teacher_first_name}</td>
                            <td>
                                {course.course_assigned_students === null ? <>
                                    <span style={{ padding: "5px", borderBottom: "solid red 3px" }}>TEAHCER NOT ASSIGNED</span>
                                </> : <>
                                    {course.course_assigned_students ? <>
                                        {course.course_assigned_students.map((student, index) => {
                                            return (
                                                <div key={index} style={{ marginTop: "5px", padding: "2px", borderBottom: "solid gray 3px",}}>
                                                    {student.student_first_name}
                                                    {'        '}
                                                    {student.student_last_name}

                                                </div>
                                            )
                                        })
                                        }
                                    </> : <></>}
                                </>}
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default TeacherCourseTable
