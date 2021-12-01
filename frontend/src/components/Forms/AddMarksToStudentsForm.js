import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import './Form.css'

const AddMarksToStudentsForm = () => {

    const [courseid, setCourseId] = useState(null)
    const [coureses, setCourses] = useState([])
    const [allStudentsOfThisCourses, setAllStudentsOfThisCourses] = useState([])

    // alert(JSON.stringify(allStudentsOfThisCourses))

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
    const getAllStudentsByTeacherAndCourseId = async (courseid) => {
        try {
            console.log(courseid)
            const { data } = await axios.get(
                `http://localhost:5000/api/course_by_teacher_and_course_id/619fbabebd201cf406570743/${courseid}`,
            )

            if (data.status == "success") {
                let students = [];
                data.response.forEach(element => {

                    element.course_assigned_students.forEach(student => {
                        console.log("EACH STUDENTS ", student)
                        students.push(student)
                    });

                });
                setAllStudentsOfThisCourses(students)
            }
            setLoading(false)
        } catch (error) {
            // alert(error)
        }
    }

    useEffect(() => {
        getAllCoursesbyTeacherId();
        getAllStudentsByTeacherAndCourseId(courseid);
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
                            <input style={{ margin: "20px" }} type="submit" value="FIND STUDENTS" />
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

                        <label>SELECT STUDENT</label>
                        <select name="student_id"
                            {...register("student_id")}
                        >
                            {allStudentsOfThisCourses.map((student, index) => {
                                return (
                                    <option key={index} value={student._id}>{student.student_first_name}</option>
                                )
                            })}
                        </select>

                        {/* //* SELECT STUDENT */}
                        

                        <input type="submit" value="Submit" />

                    </div>
                </>
            }

        </div>
    )
}

export default AddMarksToStudentsForm
