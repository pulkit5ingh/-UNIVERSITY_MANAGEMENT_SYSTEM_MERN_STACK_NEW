import React, { useState, useEffect } from 'react'
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
    const onSubmit = data => {
        console.log(data)
    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div className="container">
            <h1><b>LOG IN</b></h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* EMAIL */}
                <label>FIRST NAME</label>
                <input type="first_name" name="first_name" placeholder="Your first_name ..."
                    {...register("first_name", { required: true })}
                />
                {/* EMAIL */}
                <label>LAST NAME</label>
                <input type="last_name" name="last_name" placeholder="Your last name ..."
                    {...register("last_name", { required: true })}
                />
                {/* EMAIL */}
                <label for="fname">EMAIL</label>
                <input type="email" name="email" placeholder="Your Email ..."
                    {...register("email", { required: true })}
                />
                <div className="error">{errors.email && <span>This field is required</span>}</div>
                {/* password */}
                <label for="lname">PASSWORD</label>
                <input type="password" name="password" placeholder="Your Password ..."
                    {...register("password", { required: true })}
                />
                <div className="error">{errors.password && <span>This field is required</span>}</div>

                {/* GENDER */}
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
