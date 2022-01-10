// import React from 'react'
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../components/Forms/Form.css";

const EditStudent = () => {
    let params = useParams();

    let id = params._id

    // * Use State
    const [student, setStudent] = useState(null)
    const [Loading, setLoading] = useState(true)

    const navigate = useNavigate();


    const getAllTeachers = async () => {

        try {
            const data = await axios.get(
                `http://localhost:5000/api/student/${id}`,
            )
            // alert(JSON.stringify(data.data.response))
            console.log(data)
            setStudent({
                student_first_name: data.data.response.student_first_name,
                student_last_name: data.data.response.student_last_name,
                student_cnic: data.data.response.student_cnic,
                student_email: data.data.response.student_email,
                student_inter_marks: data.data.response.student_inter_marks,
                student_phone_number: data.data.response.student_phone_number,
                student_gender: data.data.response.student_gender,
                student_domicile: data.data.response.student_domicile,
                student_password: data.data.response.student_password,
            })
            setLoading(false)
        } catch (error) {
            //  alert(error)
        }
    }

    // alert(JSON.stringify(teachers))


    useEffect(() => {
        getAllTeachers();
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
            student_first_name: data.student_first_name,
            student_last_name: data.student_last_name,
            student_cnic: data.student_cnic,
            student_email: data.student_email,
            student_gender: data.student_gender,
            student_phone_number: data.student_phone_number,
            student_domicile: data.student_domicile,
            student_inter_marks: data.student_inter_marks,
            student_password: data.student_password,
            student_semester: data.semester
        }

        // alert(JSON.stringify(data))

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const data = await axios.put(
                'http://localhost:5000/api/student',
                formData,
                config
            )

            console.log(data)
            if (data.data.status === "success") {
                navigate("/admin/all-students");
            } else {
                // alert(JSON.stringify(data.data.message))
            }

        } catch (error) {
            //  alert(error)
        }
    };

    console.log(watch("example"));
    return (

        <>
            <Header />
            <AdminSideBar />
            <div className="container">
                <h1><b>EDIT STUDENT</b></h1>

                {Loading ? <>Loading ...</> : <>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* //* FIRST NAME */}
                        <label>FIRST NAME</label>
                        <input type="text" name="student_first_name"
                            {...register("student_first_name")}
                            defaultValue={student.student_first_name}
                            autoFocus
                        // value={student.student_first_name}
                        />
                        <div className="error">{errors.student_first_name && <span>This field is required</span>}</div>
                        {/* //* LAST NAME */}
                        <label>LAST NAME</label>
                        <input type="text" name="student_last_name"
                            {...register("student_last_name")}
                            autoFocus
                            defaultValue={student.student_last_name}
                        />
                        <div className="error">{errors.student_last_name && <span>This field is required</span>}</div>
                        {/* //* EMAIL */}
                        <label for="fname">EMAIL</label>
                        <input type="email" name="student_email"
                            {...register("student_email")}
                            autoFocus
                            defaultValue={student.student_email}
                        />
                        <div className="error">{errors.student_email && <span>This field is required</span>}</div>
                        {/* //* CNIC */}
                        <label>CNIC</label>
                        <input type="text" name="student_cnic"
                            {...register("student_cnic")}
                            autoFocus
                            defaultValue={student.student_cnic}
                        />

                        <div className="error">{errors.student_phone_number && <span>This field is required</span>}</div>
                        {/* //* PHONE NUMBER */}
                        <label>PHONE NUMBER</label>
                        <input type="text" name="student_phone_number"
                            {...register("student_phone_number")}
                            autoFocus
                            defaultValue={student.student_phone_number}
                        />
                        <div className="error">{errors.phone_number && <span>This field is required</span>}</div>

                        {/* //* CGPA */}
                        {/* <label>CGPA</label>
                    <input type="text" name="cgpa"
                        {...register("cgpa")}
                        autoFocus 
                        defaultValue={teachers.teacher_cgpa}
                    />
                    <div className="error">{errors.cgpa && <span>This field is required</span>}</div> */}
                        {/* //* DOMISILE */}
                        <label>DOMISILE</label>
                        <input type="text" name="student_domicile"
                            {...register("student_domicile")}
                            autoFocus
                            defaultValue={student.student_domicile}
                        />
                        <div className="error">{errors.student_domicile && <span>This field is required</span>}</div>

                        {/* //* INTER MARKS */}
                        <label>INTER MARKS</label>
                        <input type="text" name="student_inter_marks"
                            {...register("student_inter_marks")}
                            autoFocus
                            defaultValue={student.student_inter_marks}
                        />
                        <div className="error">{errors.student_inter_marks && <span>This field is required</span>}</div>

                        {/* //* PASSWORD */}
                        <label>PASSWORD</label>
                        <input type="text" name="student_password"
                            {...register("student_password")}
                            autoFocus
                            defaultValue={student.student_password}
                        />
                        <div className="error">{errors.student_password && <span>This field is required</span>}</div>

                        {/* //* SEMESTER */}
                        <label>SEMESTER</label>
                        <select name="semester"
                            {...register("semester")}
                        >
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                            <option value="4th">4th</option>
                            <option value="5th">5th</option>
                            <option value="6th">6th</option>
                            <option value="7th">7th</option>
                            <option value="8th">8th</option>
                        </select>

                        {/* //* GENDER */}
                        <label>GENDER</label>
                        <select name="gender"
                            {...register("gender")}
                            defaultValue={student.student_domicile}
                        >
                            <option value="male">MALE</option>
                            <option value="female">FEMALE</option>
                            <option value="others">OTHERS</option>
                        </select>

                        <input type="submit" value="Update" />

                    </form>

                </>}

            </div>
        </>
    )
}

export default EditStudent
