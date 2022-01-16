// import React from 'react'
import TeacherSideBar from '../../components/SideBar/TeacherSideBar'
import Header from '../../components/Header/Header'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../components/Forms/Form.css";

const TeacherEditAttendance = () => {
    let params = useParams();

    let id = params._id

    // * Use State
    const [attendance, setAttendances] = useState(null)
    const [Loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const getAllAttendance = async () => {

        try {
            const data = await axios.get(
                `http://localhost:5000/api/attendance/${id}`,
            )
            // alert(JSON.stringify(data.data.response))
            console.log(attendance)
            // alert(JSON.stringify(data.data.response))
            setAttendances({
                attendance_no_of_classes: data.data.response.attendance_no_of_classes,
                attendance_student_name: data.data.response.attendance_student.student_first_name + " " + data.data.response.attendance_student.student_last_name,
            })
            setLoading(false)
        } catch (error) {
            //  alert(error)
        }
    }

    // alert(JSON.stringify(teachers))

    useEffect(() => {
        getAllAttendance();
    }, [])


    // * REACT HOOK FORM 
    const { register, handleSubmit, watch, formState: { errors } } = useForm(
        {
            // defaultValue: teachers
        }
    );


    const onSubmit = async data => {

        let formData = {
            id: id,
            attendance_no_of_classes: data.attendance_no_of_classes,
        }

        // alert(JSON.stringify(data))

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const data = await axios.put(
                'http://localhost:5000/api/update_attendance',
                formData,
                config
            )

            console.log(data)
            if (data.data.status === "success") {
                navigate("/teacher/add-attendance");
            } else {
                // alert(JSON.stringify(data.data.message))
            }

        } catch (error) {
            // alert(error)
        }
    };

    console.log(watch("example"));
    return (

        <>
            <Header />
            <TeacherSideBar />
            <div className="container">
                <h1><b>EDIT ATTENDANCE</b></h1>

                {Loading ? <>Loading ...</> : <>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* //* FIRST NAME */}
                        <label>STUDENT NAME</label>
                        <input type="text" name="attendance_student"
                            defaultValue={attendance.attendance_student_name}
                            disabled
                        // value={teachers.teacher_first_name}
                        />
                        {/* //* LAST NAME */}
                        <label>LAST NAME</label>
                        <input type="text" name="attendance_no_of_classes"
                            {...register("attendance_no_of_classes")}
                            autoFocus
                            defaultValue={attendance.attendance_no_of_classes}
                        />

                        <input type="submit" value="Update" />

                    </form>

                </>}

            </div>
        </>
    )
}

export default TeacherEditAttendance
