import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'
import './Table.css'

const AdminCourseTable = () => {

    // * Use State
    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])
    let [year, setYear] = useState(1);
    let [semester, setSemester] = useState(1);

    // * REACT HOOK FORM 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        let year = parseInt(data.year);
        let semester = parseInt(data.semester);
        console.log(year, semester)
        setYear(year);
        setSemester(semester);
    }

    // * Get Courses
    const getAllCourses = async (year, semester) => {

        try {
            const data = await axios.get(
                `http://localhost:5000/api/courses/${year}/${semester}`,
            )
            setCourses(data.data.response)
            setLoading(false)
        } catch (error) {
            // alert(error)
        }
    }

    useEffect(() => {
        getAllCourses(year, semester);
    }, [year, semester, loading])

    return (
        <div className="table-container">
            {/* <Link className="add-btn" to="/admin/add-student">COURSES</Link> */}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="dashboard-container">
                    <div class="row">
                        <div class="column">
                            <label>YEAR</label>
                            <select name="year"
                                {...register("year")}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>

                        <div class="column">
                            <label>SEMESTER</label>
                            <select name="semester"
                                {...register("semester")}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <div class="column">
                            <input style={{ margin: "20px" }} type="submit" value="FILTER" />
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
                            <th>course name</th>
                            <th>course year</th>
                            <th>course semester</th>
                            <th>ASSIGN TEACHER</th>
                            <th>ASSIGN STUDENT</th>
                            <th>VIEW</th>
                        </tr>
                        {courses.map((course, key) => {
                            return (
                                <tr key={key}>
                                    <td>{course.course_name}</td>
                                    <td>{course.course_year}</td>
                                    <td>{course.course_semester}</td>
                                    <td><button className="table-edit-btn"><Link to={`/admin/courses/assign-teacher/${course._id}`}>Assign teacher</Link></button></td>
                                    <td><button className="table-edit-btn"><Link to={`/admin/courses/assign-student/${course._id}`}>Assign student</Link></button></td>
                                    <td><button className="table-view-btn">VIEW</button></td>
                                </tr>
                            )
                        })}
                    </table>
                </>
            }

        </div>
    )
}

export default AdminCourseTable
