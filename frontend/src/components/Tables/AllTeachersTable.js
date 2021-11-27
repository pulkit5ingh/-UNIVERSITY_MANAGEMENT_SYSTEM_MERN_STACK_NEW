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
            alert(error)
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
                    <th>VIEW</th>
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
                            <td><button className="table-edit-btn">EDIT</button></td>
                            <td><button className="table-delete-btn">DELETE</button></td>
                            <td><button className="table-view-btn">VIEW</button></td>
                        </tr>
                    )
                })}
            </table>

        </div>
    )
}

export default AllTeachersTable
