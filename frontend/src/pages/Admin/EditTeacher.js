// import React from 'react'
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../components/Forms/Form.css";

const EditTeacher = () => {
    let params = useParams();

    let id = params._id

    // * Use State
    const [teachers, setTeachers] = useState(null)
    const [Loading, setLoading] = useState(true)

    const navigate = useNavigate();


    const getAllTeachers = async () => {

        try {
            const data = await axios.get(
                `http://localhost:5000/api/teacher/${id}`,
            )
            // alert(JSON.stringify(data.data.response))
            console.log(data)
            setTeachers({
                teacher_first_name: data.data.response.teacher_first_name,
                teacher_last_name: data.data.response.teacher_last_name,
                teacher_cnic: data.data.response.teacher_cnic,
                teacher_university_name: data.data.response.teacher_university_name,
                teacher_email: data.data.response.teacher_email,
                teacher_password: data.data.response.teacher_password,
                teacher_phone_number: data.data.response.teacher_phone_number,
                teacher_gender: data.data.response.teacher_gender,
                teacher_domicile: data.data.response.teacher_domicile
            })
            setLoading(false)
        } catch (error) {
            alert(error)
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
            teacher_first_name: data.teacher_first_name,
            teacher_last_name: data.teacher_last_name,
            teacher_cnic: data.teacher_cnic,
            teacher_email: data.teacher_email,
            teacher_university_name: data.teacher_university_name,
            teacher_qualification: data.teacher_qualification,
            teacher_gender: data.teacher_gender,
            teacher_phone_number: data.teacher_phone_number,
            teacher_domicile: data.teacher_domicile,
            teacher_password: data.teacher_password,
            teacher_cgpa: data.teacher_cgpa,
        }

        alert(JSON.stringify(data))

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const data = await axios.put(
                'http://localhost:5000/api/teacher',
                formData,
                config
            )

            console.log(data)
            if (data.data.status === "success") {
                navigate("/admin/all-teachers");
            } else {
                alert(JSON.stringify(data.data.message))
            }

        } catch (error) {
            alert(error)
        }
    };

    console.log(watch("example"));
    return (

        <>
            <Header />
            <AdminSideBar />
            <div className="container">
                <h1><b>EDIT TEACHER</b></h1>

                {Loading ? <>Loading ...</> : <>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* //* FIRST NAME */}
                        <label>FIRST NAME</label>
                        <input type="text" name="teacher_first_name"
                            {...register("teacher_first_name")}
                            defaultValue={teachers.teacher_first_name}
                            autoFocus
                        // value={teachers.teacher_first_name}
                        />
                        <div className="error">{errors.teacher_first_name && <span>This field is required</span>}</div>
                        {/* //* LAST NAME */}
                        <label>LAST NAME</label>
                        <input type="text" name="teacher_last_name"
                            {...register("teacher_last_name")}
                            autoFocus
                            defaultValue={teachers.teacher_last_name}
                        />
                        <div className="error">{errors.teacher_last_name && <span>This field is required</span>}</div>
                        {/* //* EMAIL */}
                        <label for="fname">EMAIL</label>
                        <input type="email" name="teacher_email"
                            {...register("teacher_email")}
                            autoFocus
                            defaultValue={teachers.teacher_email}
                        />
                        <div className="error">{errors.teacher_email && <span>This field is required</span>}</div>
                        {/* //* CNIC */}
                        <label>CNIC</label>
                        <input type="text" name="teacher_cnic"
                            {...register("teacher_cnic")}
                            autoFocus
                            defaultValue={teachers.teacher_cnic}
                        />
                        <div className="error">{errors.teacher_cnic && <span>This field is required</span>}</div>
                        {/* //* UNIVERSITY UNIVERCITY */}
                        <label>UNIVERSITY UNIVERCITY</label>
                        <input type="text" name="teacher_university_name"
                            {...register("teacher_university_name")}
                            autoFocus
                            defaultValue={teachers.teacher_university_name}
                        />
                        <div className="error">{errors.teacher_university_name && <span>This field is required</span>}</div>
                        {/* //* PHONE NUMBER */}
                        <label>PHONE NUMBER</label>
                        <input type="text" name="teacher_phone_number"
                            {...register("teacher_phone_number")}
                            autoFocus
                            defaultValue={teachers.teacher_phone_number}
                        />
                        <div className="error">{errors.phone_number && <span>This field is required</span>}</div>
                        {/* //* qualification */}
                        <label>QUALIFICATION</label>
                        <input type="text" name="teacher_university_name"
                            {...register("teacher_university_name")}
                            autoFocus
                            defaultValue={teachers.teacher_university_name}
                        />
                        <div className="error">{errors.teacher_university_name && <span>This field is required</span>}</div>
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
                        <input type="text" name="teacher_domicile"
                            {...register("teacher_domicile")}
                            autoFocus
                            defaultValue={teachers.teacher_domicile}
                        />
                        <div className="error">{errors.teacher_domicile && <span>This field is required</span>}</div>

                        {/* //* PASSWORD */}
                        <label>PASSWORD</label>
                        <input type="text" name="teacher_password"
                            {...register("teacher_password")}
                            autoFocus
                            defaultValue={teachers.teacher_password}
                        />
                        <div className="error">{errors.teacher_password && <span>This field is required</span>}</div>

                        {/* //* GENDER */}
                        <label>GENDER</label>
                        <select name="gender"
                            {...register("gender")}
                            defaultValue={teachers.teacher_domicile}
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

export default EditTeacher
