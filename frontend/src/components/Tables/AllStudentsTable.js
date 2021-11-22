import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import './Table.css'

const AllStudentsTable = () => {

    // * Use State
    const [students, setStudents] = useState([])
    let [page, setPage] = useState(1);
    let [limit, setLimit] = useState(5);

    const getAllStudents = async () => {

        try {
            const data = await axios.get(
                `http://localhost:5000/api/students?page=${page}&limit=${limit}`,
            )
            // alert(JSON.stringify(data))
            console.log(students)
            setStudents(data.data.response)
        } catch (error) {
            alert(error)
        }
    }

    const nextPage = () => {
        setPage((page = page + 1));
    };

    const previoustPage = () => {
        setPage((page = page - 1));
    };

    useEffect(() => {
        getAllStudents();
    }, [page, limit])

    return (
        <div className="table-container">
            <Link to="/admin/add-student">ADD STUDENT</Link>

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
                    <th>VIEW</th>
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
                            <td><button className="table-edit-btn">EDIT</button></td>
                            <td><button className="table-delete-btn">DELETE</button></td>
                            <td><button className="table-view-btn">VIEW</button></td>
                        </tr>
                    )
                })}
            </table>

            <div className="pre-next-container">
                <button className="next-prev" onClick={previoustPage}>PREVIOUS</button>
                <button className="next-prev" onClick={nextPage}>NEXT</button>
            </div>

        </div>
    )
}

export default AllStudentsTable
