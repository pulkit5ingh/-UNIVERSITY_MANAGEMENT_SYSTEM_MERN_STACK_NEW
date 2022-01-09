import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import TeacherSideBar from '../../components/SideBar/TeacherSideBar'
import Header from '../../components/Header/Header'

const Profile = () => {

    // * ======================== authentication
    const navigate = useNavigate();

    // * ==== get user state 
    const adminLogin = useSelector((state) => state.adminLogin)
    const { loading, error, userInfo, message } = adminLogin;

    // alert(JSON.stringify(userInfo))

    // * USE EFFECT REDIRECT TO LOG IN 
    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        }
        if (userInfo) {

            if (userInfo.is_teacher === true) {

            }
            else {
                navigate("/");
            }
        }
        else {
            navigate("/");
        }
    }, [navigate, userInfo])

    // * ======================== authentication

    return (
        <div>
            <Header />
            <TeacherSideBar />
            <div className="dashboard-container">
                <div class="row">
                    <div class="card">
                        <h3>TEACHER PROFILE</h3>
                        <p><b>TEACHER NAME</b> :
                            {"    "}
                            {userInfo != null && userInfo.teacher_first_name}
                            {"    "}
                            {userInfo != null && userInfo.teacher_last_name}
                        </p>
                        <p><b>TEACHER EMAIL</b> :
                            {"    "}
                            {userInfo != null && userInfo.teacher_email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
