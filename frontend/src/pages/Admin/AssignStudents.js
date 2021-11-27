import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import axios from 'axios'
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'

const AssignStudents = () => {

    // ? ================================== Authentication 
    // * use navigate 
    const navigate = useNavigate();

    // * ==== get user state 
    const adminLogin = useSelector((state) => state.adminLogin)
    const { error, userInfo, message } = adminLogin;

    // * USE EFFECT REDIRECT TO DASH BOARD 
    useEffect(() => {
        if (userInfo) {
        } else {
            navigate("/");
        }
    }, [navigate, userInfo])

    // ? ================================== Authentication 

    // * use state 
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState({
        course_name: "NULL",
        course_desc: "NUll",
        course_year: 0,
        course_semester: 0,
        course_assigned_teacher: { teacher_first_name: "NULL" }
    });
    const [students, setStudents] = useState([]);

    // * Use params
    let params = useParams();
    let id = params.id;

    // * function
    //* get course details
    const getCourse = async () => {
        try {
            const data = await axios.get(
                `http://localhost:5000/api/course/${id}`,
            )
            setCourse(data.data.response)
            setLoading(false)
        } catch (error) {
            // alert(error)
        }
    }

    //* get all teachers
    const getAllStudents = async () => {
        try {
            console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGg")
            const data = await axios.get(
                `http://localhost:5000/api/students?page=1&limit=100`,
            )
            setStudents(data.data.response)
        } catch (error) {
            // alert(error)
        }
    }

    // * assign teacher to course

    const updateCourse = async (student_id) => {
        console.log("SID => ", student_id.student)
        let formData = {
            student_id: student_id.student,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const data = await axios.put(
            `http://localhost:5000/api/add_student_to_course/${id}`,
            formData,
            config
        )
        console.log(data)
        if (data.data.status === "success") {
            window.location.reload(false);
            // getAllStudents();
            // navigate(`/admin/courses`);
        } else {
            alert(JSON.stringify(data.data.message))
        }
    }

    // * remove student 

    const deleteStudent = async (student_id) => {
        console.log("SID => ", student_id.id)
        let formData = {
            student_id: student_id.id,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const data = await axios.put(
            `http://localhost:5000/api/remove_student_from_course/${id}`,
            formData,
            config
        )
        console.log(data)
        if (data.data.status === "success") {
            // getCourse();
            // getAllStudents();
            window.location.reload(false);
            // navigate(`courses/assign-student/${id}`);
            // getAllStudents();
        } else {
            alert(JSON.stringify(data.data.message))
        }
    }

    // * REACT HOOK FORM 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        updateCourse(data)
    }

    const onRemoveSubmit = data => {
        // console.log(data.id)
        deleteStudent(data)
    }

    // * use effect 
    useEffect(() => {
        getCourse();
        getAllStudents();
    }, [id])


    return (
        <div>
            <Header />
            <AdminSideBar />
            <div className="dashboard-container">
                <div class="row">
                    {loading ? <>loading</> : <>
                        <div class="card">
                            <h3>COURSE DETAILS</h3>
                            <p>NAME {course.course_name}</p>
                            <p>DESCRIPTION {course.course_desc}</p>
                            <p>COURSE YEAR : {course.course_year}</p>
                            <p>COURSE SEMESTER : {course.course_semester}</p>
                            <div style={{ backgroundColor: "#d9e2ff", padding: "6px" }}>
                                <p>COURSE ASSIGNED STUDENTS :

                                    {course.course_assigned_students === null ? <>
                                        <span style={{ padding: "5px", borderBottom: "solid red 3px" }}>TEAHCER NOT ASSIGNED</span>
                                    </> : <>
                                        {course.course_assigned_students ? <>

                                            {course.course_assigned_students.map((student, index) => {
                                                return (
                                                    <div key={index} style={{ marginTop: "5px", padding: "10px", borderBottom: "solid blue 3px", borderTop: "solid blue 3px" }}>
                                                        {student.student_first_name}
                                                        {'        '}
                                                        {student.student_last_name}
                                                        <form onSubmit={handleSubmit(onRemoveSubmit)}>
                                                            <input type="text" name="id" value={student._id} hidden  {...register("id")} />
                                                            <button className="table-delete-btn" style={{ marginLeft: "10%" }}>REMOVE</button>
                                                        </form>
                                                    </div>
                                                )
                                            })
                                            }

                                        </> : <></>}
                                        {/* <span style={{ padding: "5px", borderBottom: "solid blue 3px" }}> {course.course_assigned_teacher.teacher_first_name}</span> */}
                                    </>}
                                </p>
                            </div>

                        </div>
                    </>}

                    <div class="card">
                        <h3>ASSIGN STUDENTS</h3>

                        {/* FORM */}
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div class="row">
                                <div class="column" style={{ marginLeft: "25%" }} >
                                    <label>ALL STUDENTS</label>
                                    <select name="student"
                                        {...register("student")}
                                    >
                                        {students.map((student, key) => {
                                            return (
                                                <option key={key} value={student._id}>{student.student_first_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div class="column">
                                    <input style={{ margin: "20px" }} type="submit" value="ASSIGN STUDENTS" />
                                </div>
                            </div>
                        </form>

                        {/*  */}

                    </div>
                </div>
            </div>
        </div >
    )
}

export default AssignStudents
