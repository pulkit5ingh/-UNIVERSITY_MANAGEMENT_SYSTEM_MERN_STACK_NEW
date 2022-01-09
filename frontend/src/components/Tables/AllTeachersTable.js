import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import './Table.css'

const AllTeachersTable = () => {

    // * Use State
    const [teachers, setTeachers] = useState([])

    const getAllTeachers = async () => {

        try {
            const data = await axios.get(
                `http://localhost:5000/api/teachers`,
            )
            // alert(JSON.stringify(data))
            console.log(data)
            setTeachers(data.data.response)
        } catch (error) {
           // alert(error)
        }
    }

    const deleteTeacher = async (id) => {

        try {

            // alert(JSON.stringify(id))

            let formData = {
                id
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const data = await axios.post(
                'http://localhost:5000/api/delete_teacher',
                formData,
                config
            )


            console.log(data)
            if (data.data.status === "success") {
                alert("TEACHER DELETED SUCCESSFULLY")
                getAllTeachers();
            } else {

            }

        } catch (error) {
           // alert(error)
        }

    }



    useEffect(() => {
        getAllTeachers();
    }, [])

    return (
        <div className="table-container">
            <Link className="add-btn" to="/admin/add-teacher">ADD TEACHER</Link>

            <table>
                <tr>
                    <th>first name</th>
                    <th>last name</th>
                    <th>email</th>
                    <th>gender</th>
                    <th>phone number</th>
                    <th>qualification</th>
                    <th>university</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
                {teachers.map((teacher, key) => {
                    return (
                        <tr key={key}>
                            <td>{teacher.teacher_first_name}</td>
                            <td>{teacher.teacher_last_name}</td>
                            <td>{teacher.teacher_cnic}</td>
                            <td>{teacher.teacher_email}</td>
                            <td>{teacher.teacher_gender}</td>
                            <td>{teacher.teacher_phone_number}</td>
                            <td>{teacher.teacher_domicile}</td>
                            <td><Link to={`/admin/edit/teacher/${teacher._id}`} className="table-edit-btn" >EDIT</Link></td>
                            <td><button className="table-delete-btn" onClick={() => {
                                deleteTeacher(teacher._id)
                            }} >DELETE</button></td>
                        </tr>
                    )
                })}
            </table>

        </div>
    )
}

export default AllTeachersTable
