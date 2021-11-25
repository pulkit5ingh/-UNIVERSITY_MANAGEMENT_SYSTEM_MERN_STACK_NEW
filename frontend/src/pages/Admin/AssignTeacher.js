import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'

const AssignTeacher = () => {

    // * use state 
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState({
        course_name: "NULL",
        course_desc: "NUll",
        course_year: 0,
        course_semester: 0,
        course_assigned_teacher: { teacher_first_name: "NULL" }
    });
    const [teachers, setTeachers] = useState([]);

    // * use navigate 
    const navigate = useNavigate();

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
    const getAllTeachers = async () => {
        try {
            const data = await axios.get(
                `http://localhost:5000/api/teachers?page=1&limit=100`,
            )
            setTeachers(data.data.response)
        } catch (error) {
            // alert(error)
        }
    }

    // * assign teacher to course

    const updateCourse = async (teacher_id) => {
        console.log("TID => ", teacher_id.teacher)

        let formData = {
            course_assigned_teacher: teacher_id.teacher,
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const data = await axios.put(
            `http://localhost:5000/api/course/${id}`,
            formData,
            config
        )

        console.log(data)
        if (data.data.status === "success") {
            window.location.reload(false);
            navigate(`/admin/courses`);
        } else {
            alert(JSON.stringify(data.data.message))
        }

    }

    // * REACT HOOK FORM 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        updateCourse(data)
    }

    // * use effect 
    useEffect(() => {
        getCourse();
        getAllTeachers();
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
                                <p>COURSE ASSIGNED TEACHER :
                                    {course.course_assigned_teacher === null ? <>
                                        <span style={{ padding: "5px", borderBottom: "solid red 3px" }}>TEAHCER NOT ASSIGNED</span>
                                    </> : <>
                                        <span style={{ padding: "5px", borderBottom: "solid blue 3px" }}> {course.course_assigned_teacher.teacher_first_name}</span>
                                    </>}
                                </p>
                            </div>

                        </div>
                    </>}

                    <div class="card">
                        <h3>ASSIGN TEACHER</h3>

                        {/* FORM */}
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div class="row">
                                <div class="column" style={{ marginLeft: "25%" }} >
                                    <label>ALL TEACHERS</label>
                                    <select name="teacher"
                                        {...register("teacher")}
                                    >
                                        {teachers.map((teacher, key) => {
                                            return (
                                                <option key={key} value={teacher._id}>{teacher.teacher_first_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div class="column">
                                    <input style={{ margin: "20px" }} type="submit" value="ASSIGN TEACHER" />
                                </div>
                            </div>
                        </form>

                        {/*  */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignTeacher
