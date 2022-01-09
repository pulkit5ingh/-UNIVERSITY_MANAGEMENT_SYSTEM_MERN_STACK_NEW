import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import './Table.css'

const AllStudentsTable = () => {

    // * use navigate 
    const navigate = useNavigate();

    // * Use State
    const [students, setStudents] = useState([])

    const getAllStudents = async () => {
        try {
            const data = await axios.get(
                `http://localhost:5000/api/students`,
            )
            // alert(JSON.stringify(data))
            console.log(students)
            setStudents(data.data.response)
        } catch (error) {
           // alert(error)
        }
    }


    const deleteStudent = async (id) => {

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
                'http://localhost:5000/api/delete_student',
                formData,
                config
            )


            console.log(data)
            if (data.data.status === "success") {
                alert("STUDENT DELETED SUCCESSFULLY")
                getAllStudents();
                navigate("/admin/all-students");
            } else {

            }

        } catch (error) {
            alert(error)
        }

    }

    useEffect(() => {
        getAllStudents();
    }, [])

    return (
        <div className="table-container">
            <Link className="add-btn" to="/admin/add-student">ADD STUDENT</Link>

            <table>
                <tr>
                    <th>first name</th>
                    <th>last name</th>
                    <th>cnic</th>
                    <th>email</th>
                    <th>gender</th>
                    <th>phone number</th>
                    <th>domicile</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
                {students.map((student, key) => {
                    return (
                        <tr>
                            <td>{student.student_first_name}</td>
                            <td>{student.student_last_name}</td>
                            <td>{student.student_cnic}</td>
                            <td>{student.student_email}</td>
                            <td>{student.student_gender}</td>
                            <td>{student.student_phone_number}</td>
                            <td>{student.student_domicile}</td>
                            <td><Link to={`/admin/edit/student/${student._id}`} className="table-edit-btn" >EDIT</Link></td>
                            <td><button className="table-delete-btn" onClick={() => {
                                deleteStudent(student._id)
                            }} >DELETE</button></td>
                        </tr>
                    )
                })}
            </table>

        </div>
    )
}

export default AllStudentsTable
