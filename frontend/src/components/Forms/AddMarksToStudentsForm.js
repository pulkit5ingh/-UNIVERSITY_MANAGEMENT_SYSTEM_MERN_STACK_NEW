import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import './Form.css'

const AddMarksToStudentsForm = () => {

    // * ======================== authentication
    const navigate = useNavigate();

    // * ==== get user state 
    const adminLogin = useSelector((state) => state.adminLogin)
    const { error, userInfo, message } = adminLogin;

    // * USE EFFECT REDIRECT TO LOG IN 
    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        }
        if (userInfo) {

            if (userInfo.is_teacher === true) {

            }
            else {
                navigate("/");
            }
        }
        else {
            navigate("/");
        }
    }, [navigate, userInfo])

    // * ======================== authentication

    const [courseid, setCourseId] = useState(null)
    const [coureses, setCourses] = useState([])
    const [teacherMarks, setTeacherMarks] = useState([])
    const [allStudentsOfThisCourses, setAllStudentsOfThisCourses] = useState([])

    // alert(JSON.stringify(allStudentsOfThisCourses))

    const [loading, setLoading] = useState(true)

    // * ========================

    // console.log(courseid)

    // * REACT HOOK FORM 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onCourseSubmit = async data => {

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

    const onMarksSubmit = async data => {

        try {
           // alert(JSON.stringify(data))

            let formData = {
                attendance_marks: data.attendance_marks,
                midterm_marks: data.midterm_marks,
                final_marks: data.final_marks,

                course_id: courseid,
                teacher_id: userInfo._id,
                student_id: data.student_id,
            }

            try {

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }

                const data = await axios.post(
                    'http://localhost:5000/api/marks',
                    formData,
                    config
                )

                console.log(data)
                if (data.data.status === "success") {
                    getAlMarksbyTeacherId();
                    // window.location.reload(false);
                } else {
                  //  alert("SOMETHING WENT WRONG")
                }

            } catch (error) {

            }

        } catch (error) {

        }
    };

    // * Get All Students
    const getAlMarksbyTeacherId = async () => {
        try {
            const data = await axios.get(
                `http://localhost:5000/api/marks_by_teacher/${userInfo._id}`,
            )
            setTeacherMarks(data.data.response)
        } catch (error) {
        }
    }

    // * Get All Students
    const getAllCoursesbyTeacherId = async () => {
        try {
            const data = await axios.get(
                `http://localhost:5000/api/teacher_courses/${userInfo._id}`,
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
                `http://localhost:5000/api/course_by_teacher_and_course_id/${userInfo._id}/${courseid}`,
            )

            if (data.status === "success") {
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
        getAlMarksbyTeacherId();
    }, [courseid,])

    return (
        <div className="table-container">
            {/* <Link className="add-btn" to="/admin/add-student">COURSES</Link> */}

            <form onSubmit={handleSubmit(onCourseSubmit)}>
                <div className="dashboard-container">
                    <h4>ADD MARKS</h4>
                    <div class="row">
                        <div class="column">
                            <label>YOUR NAME</label>
                            <input type="text" value={`${userInfo.teacher_first_name + " " + userInfo.teacher_last_name}`} disabled />
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
                        <form onSubmit={handleSubmit(onMarksSubmit)}>
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

                            {/* //* ATTENDANCE MARKS */}
                            <label>ATTENDANCE MARKS</label>
                            <input type="number" name="attendance_marks" placeholder="attendance marks ..."
                                {...register("attendance_marks")}
                            />

                            {/* //* MIDTERM MARKS */}
                            <label>MIDTERM MARKS</label>
                            <input type="number" name="midterm_marks" placeholder="midterm marks ..."
                                {...register("midterm_marks")}
                            />

                            {/* //* FINAL MARKS */}
                            <label>FINAL MARKS</label>
                            <input type="number" name="final_marks" placeholder="final marks ..."
                                {...register("final_marks")}
                            />

                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </>
            }

            {/* SHOW TEACHER MARKS */}


            <table>
                <tr>
                    <th>Course Name</th>
                    <th>Teacher name</th>
                    <th>Student name</th>
                    <th>Attendance Marks</th>
                    <th>Mid Term Marks</th>
                    <th>Final Term Marks</th>
                </tr>
                {teacherMarks.map((teacherMark, key) => {
                    return (
                        <tr>
                            <td>{teacherMark.course_id.course_name}</td>
                            <td>{teacherMark.teacher_id.teacher_first_name}</td>
                            <td>{teacherMark.student_id.student_first_name}</td>
                            <td>{teacherMark.attendance_marks}</td>
                            <td>{teacherMark.midterm_marks}</td>
                            <td>{teacherMark.final_marks}</td>
                        </tr>
                    )
                })}
            </table>

        </div>
    )
}

export default AddMarksToStudentsForm
