import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import './Form.css'

const AddMarksToStudentsForm = () => {

    const [students, setStudents] = useState([])
    const [courseid, setCourseId] = useState(null)
    const [coureses, setCourses] = useState([])
    const [teacherCourses, setAllTeacherCourses] = useState([])
    const [loading, setLoading] = useState(true)

    // * ========================

    // * REACT HOOK FORM 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {

        try {
            console.log(data.course_id)

            setCourseId(data.course_id)

            if (data.data.status === "success") {
                window.location.reload(false);
            } else {
            }

        } catch (error) {

        }
    };

    // * Get All Students
    const getAllCoursesbyTeacherId = async () => {
        try {
            const data = await axios.get(
                `http://localhost:5000/api/teacher_courses/619fbabebd201cf406570743`,
            )
            setCourses(data.data.response)
            if(courseid == 'null'){
                setCourseId(data.data.response[0])
            }
        } catch (error) {
        }
    }

    // * Get ALl teacher cources
    const getAllCoursesByTeacherAndCourseId = async (courseid) => {
        try {
            const data = await axios.get(
                `http://localhost:5000/api/course_by_teacher_and_course_id/619fbabebd201cf406570743/${courseid}`,
            )
            console.log(data)
            setAllTeacherCourses(data.data.response)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getAllCoursesbyTeacherId();
        getAllCoursesByTeacherAndCourseId();
    }, [courseid])

    return (
        <div className="table-container">
            {/* <Link className="add-btn" to="/admin/add-student">COURSES</Link> */}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="dashboard-container">
                    <h4>ADD MARKS</h4>
                    <div class="row">
                        <div class="column">
                            <label>YEAR</label>
                            <input type="text" value="YOUR NAME " disabled />
                        </div>

                        <div class="column">
                            <label>SELECT COURSE</label>
                            <select name="course_id"
                                {...register("course_id")}
                            >
                                {coureses.map((course, index) => {
                                    return (
                                        <option key={index} value={course._id}>{course.course_name}</option>
                                    )
                                })}
                            </select>
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
                        {coureses.map((course, key) => {
                            return (
                                <>
                                    {
                                        course.course_assigned_students.map((student, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{student.student_first_name}</td>
                                                    <td>{student.student_last_name}</td>
                                                    <td>{student.student_inter_marks}</td>
                                                    <td>{student.createdAt}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </>
                            )
                        })}
                    </table>
                </>
            }

        </div>
    )
}

export default AddMarksToStudentsForm
