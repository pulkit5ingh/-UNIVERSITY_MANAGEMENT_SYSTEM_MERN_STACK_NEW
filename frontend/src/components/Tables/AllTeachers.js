import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AllTeachers = () => {

    // * Use State
    const [teachers, setTeachers] = useState([])

    const getAllTeacher = () => {

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.get(
                'http://localhost:5000/api/teachers',
                config
            )
        } catch (error) {
        }
    }

    return (
        <div>

        </div>
    )
}

export default AllTeachers
