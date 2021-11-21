import React from 'react'
import { useForm } from "react-hook-form";
import './LoginForm.css'

const LoginForm = () => {

    // * REACT HOOK FORM 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it


    return (
        <div className="container">
            <h1><b>LOG IN</b></h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label for="fname">EMAIL</label>
                <input type="email" name="email" placeholder="Your Email ..."
                    {...register("email", { required: true })}
                />
                <div className="error">{errors.email && <span>This field is required</span>}</div>
                <label for="lname">PASSWORD</label>
                <input type="password" name="password" placeholder="Your Password ..."
                    {...register("password", { required: true })}
                />
                <div className="error">{errors.password && <span>This field is required</span>}</div>

                <label>YOU ARE ?</label>
                <select name="access_as"
                    {...register("access_as")}
                >
                    <option value="student">STUDENT</option>
                    <option value="teacher">TEACHER</option>
                    <option value="admin">ADMIN</option>
                </select>

                <input type="submit" value="Submit" />

            </form>
        </div>
    )
}

export default LoginForm
