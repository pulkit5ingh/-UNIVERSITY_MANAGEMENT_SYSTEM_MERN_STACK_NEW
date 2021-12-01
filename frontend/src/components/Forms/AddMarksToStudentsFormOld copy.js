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

    // console.log(courseid)

    // * REACT HOOK FORM 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {

        try {
            // console.log(data.course_id)

            setCourseId(data.course_id)

            if (data.data.status === "success") {
                window.location.reload(false);
            } else {
            }

        } catch (error) {

        }
    };

    const onFormSubmit = async data => {

        console.log(data)

        try {
            // console.log(data.course_id)

            // setCourseId(data.course_id)

            // if (data.data.status === "success") {
            //     window.location.reload(false);
            // } else {
            // }

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
            console.log(courseid)
            if (courseid === null) {
                setCourseId(data.data.response[0]._id)
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
            setLoading(false)
        } catch (error) {
            // alert(error)
        }
    }

    useEffect(() => {
        getAllCoursesbyTeacherId();
        getAllCoursesByTeacherAndCourseId(courseid);
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
                            <input style={{ margin: "20px" }} type="submit" value="FIND" />
                        </div>
                    </div>
                </div>
            </form>


            {loading ?
                <>
                    Loading ....
                </> :
                <>
                    <div>

                        <form onSubmit={handleSubmit(onFormSubmit)}>

                            {/* //* SELECT COURSE */}
                            <label>SELECT STUDENT</label>
                            <select name="course_id"
                                {...register("course_id")}
                            >
                                {teacherCourses.map((course, key) => {
                                    return (
                                        <>
                                            {
                                                course.course_assigned_students.map((student, key) => {
                                                    return (
                                                        <option key={key} value={student._id}>{student.student_first_name}</option>
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                })}
                            </select>

                            {/* //* SELECT STUDENT */}
                            <label>SELECT STUDENT</label>
                            <select name="gender"
                                {...register("gender")}
                            >
                                <option value="male">MALE</option>
                                <option value="female">FEMALE</option>
                                <option value="others">OTHERS</option>
                            </select>

                            <input type="submit" value="Submit" />

                        </form>


                        {/* <tr>
                            <td style={{ maxWidth: "450px", width: "450px" }} >NAME</td>
                            <td style={{ maxWidth: "450px", width: "450px" }} >NAME</td>
                            <td style={{ maxWidth: "450px", width: "450px" }} >NAME</td>
                            <td style={{ maxWidth: "450px", width: "450px" }} >NAME</td>
                        </tr> */}

                        {/* {teacherCourses.map((course, key) => {
                            return (
                                <>
                                    {
                                        course.course_assigned_students.map((student, key) => {
                                            return (
                                                <form onSubmit={handleSubmit(onFormSubmit)}>
                                                    <tr key={key}>
                                                        <td style={{ maxWidth: "450px", width: "450px" }}>{student.student_first_name}</td>
                                                        <input type="text" value={student._id} hidden name="student_id" {...register("student_id")} />
                                                        <td style={{ maxWidth: "475px", width: "475px" }}><input type="text" name="attendance_marks" {...register("attendance_marks")} /></td>
                                                        <td style={{ maxWidth: "475px", width: "475px" }}><input type="text" name="mid_term_marks" {...register("mid_term_marks")} /></td>
                                                        <td style={{ maxWidth: "475px", width: "475px" }}><input type="submit" value="Add Marks" /></td>
                                                    </tr>
                                                </form>
                                            )
                                        })
                                    }
                                </>
                            )
                        })} */}
                    </div>
                </>
            }

        </div>
    )
}

export default AddMarksToStudentsForm
