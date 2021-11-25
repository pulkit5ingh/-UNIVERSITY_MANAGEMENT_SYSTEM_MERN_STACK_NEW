import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import './Form.css'

const CreateStudentForm = () => {

    // * use navigate 
    const navigate = useNavigate();

    // * USE EFFECT REDIRECT TO DASH BOARD 
    useEffect(() => {

    }, [])

    // * ========================

    // * REACT HOOK FORM 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {

        let formData = {
            student_first_name: data.first_name,
            student_last_name: data.last_name,
            student_cnic: data.cnic,
            student_email: data.email,
            student_inter_marks: data.inter_marks,
            student_gender: data.gender,
            student_phone_number: data.phone_number,
            student_domicile: data.domicile,
            student_password: data.password
        }

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const data = await axios.post(
                'http://localhost:5000/api/student',
                formData,
                config
            )

            console.log(data)
            if (data.data.status === "success") {
                navigate("/admin/all-students");
            } else {

            }

        } catch (error) {

        }
    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div className="container">
            <h1><b>ADD STUDENT</b></h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* //* FIRST NAME */}
                <label>FIRST NAME</label>
                <input type="text" name="first_name" placeholder="first name ..."
                    {...register("first_name", { required: true })}
                />
                <div className="error">{errors.first_name && <span>This field is required</span>}</div>
                {/* //* LAST NAME */}
                <label>LAST NAME</label>
                <input type="text" name="last_name" placeholder="last name ..."
                    {...register("last_name", { required: true })}
                />
                <div className="error">{errors.last_name && <span>This field is required</span>}</div>
                {/* //* EMAIL */}
                <label for="fname">EMAIL</label>
                <input type="email" name="email" placeholder="Email ..."
                    {...register("email", { required: true })}
                />
                <div className="error">{errors.email && <span>This field is required</span>}</div>
                {/* //* CNIC */}
                <label>CNIC</label>
                <input type="text" name="cnic" placeholder="cnic ..."
                    {...register("cnic", { required: true })}
                />
                <div className="error">{errors.cnic && <span>This field is required</span>}</div>
                {/* //* INTER MARKS */}
                <label>INTER MARKS</label>
                <input type="text" name="inter_marks" placeholder="marks ..."
                    {...register("inter_marks", { required: true })}
                />
                <div className="error">{errors.inter_marks && <span>This field is required</span>}</div>
                {/* //* PHONE NUMBER */}
                <label>PHONE NUMBER</label>
                <input type="text" name="phone_number" placeholder="phone number ..."
                    {...register("phone_number", { required: true })}
                />
                <div className="error">{errors.phone_number && <span>This field is required</span>}</div>
                {/* //* DOMICILE */}
                <label>DOMICILE</label>
                <input type="text" name="domicile" placeholder="domicile ..."
                    {...register("domicile", { required: true })}
                />
                <div className="error">{errors.domicile && <span>This field is required</span>}</div>
                {/* //* password */}
                <label for="lname">PASSWORD</label>
                <input type="password" name="password" placeholder="Your Password ..."
                    {...register("password", { required: true })}
                />
                <div className="error">{errors.password && <span>This field is required</span>}</div>

                {/* //* GENDER */}
                <label>GENDER</label>
                <select name="gender"
                    {...register("gender")}
                >
                    <option value="male">MALE</option>
                    <option value="female">FEMALE</option>
                    <option value="others">OTHERS</option>
                </select>

                <input type="submit" value="Submit" />

            </form>
        </div>
    )
}

export default CreateStudentForm
