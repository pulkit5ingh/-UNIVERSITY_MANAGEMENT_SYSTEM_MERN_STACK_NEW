// import React from 'react'
import TeacherSideBar from '../../components/SideBar/TeacherSideBar'
import Header from '../../components/Header/Header'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../components/Forms/Form.css";

const TeacherEditMarks = () => {
    let params = useParams();

    let id = params._id

    // * Use State
    const [marks, setMarks] = useState(null)
    const [Loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const getAllMarks = async () => {

        try {
            const data = await axios.get(
                `http://localhost:5000/api/marks/${id}`,
            )
            // alert(JSON.stringify(data.data.response))
            console.log(marks)
            // alert(JSON.stringify(data.data.response))
            setMarks({
                course_name: data.data.response.course_id.course_name,
                teacher_name: data.data.response.teacher_id.teacher_first_name + " " + data.data.response.teacher_id.teacher_last_name,
                attendance_marks: data.data.response.attendance_marks,
                midterm_marks: data.data.response.midterm_marks,
                final_marks: data.data.response.final_marks,
            })
            setLoading(false)
        } catch (error) {
            //  alert(error)
        }
    }

    // alert(JSON.stringify(teachers))

    useEffect(() => {
        getAllMarks();
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
            attendance_marks: data.attendance_marks,
            midterm_marks: data.midterm_marks,
            final_marks: data.final_marks,
        }

        // alert(JSON.stringify(data))

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const data = await axios.put(
                'http://localhost:5000/api/update_marks',
                formData,
                config
            )

            console.log(data)
            if (data.data.status === "success") {
                navigate("/teacher/add-marks");
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
                <h1><b>EDIT MARKS</b></h1>

                {Loading ? <>Loading ...</> : <>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* //* FIRST NAME */}
                        <label>COURSE NAME</label>
                        <input type="text"
                            defaultValue={marks.course_name}
                            disabled
                        // value={teachers.teacher_first_name}
                        />
                        {/* //* LAST NAME */}
                        <label>TEACHER NAME</label>
                        <input type="text"
                            defaultValue={marks.teacher_name}
                            disabled
                        />

                        {/* //* ATTNEDANCE MARKS*/}
                        <label>ATTNEDANCE MARKS</label>
                        <input type="text" name="attendance_marks"
                            {...register("attendance_marks")}
                            defaultValue={marks.attendance_marks}
                            autoFocus
                        // value={student.student_first_name}
                        />

                        {/* //* ATTNEDANCE MARKS*/}
                        <label>MIDTERM MARKS</label>
                        <input type="text" name="midterm_marks"
                            {...register("midterm_marks")}
                            defaultValue={marks.midterm_marks}
                            autoFocus
                        // value={student.student_first_name}
                        />

                        {/* //* ATTNEDANCE MARKS*/}
                        <label>FINAL MARKS</label>
                        <input type="text" name="final_marks"
                            {...register("final_marks")}
                            defaultValue={marks.final_marks}
                            autoFocus
                        // value={student.student_first_name}
                        />

                        <input type="submit" value="Update" />

                    </form>

                </>}

            </div>
        </>
    )
}

export default TeacherEditMarks
