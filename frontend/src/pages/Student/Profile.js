import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import StudentSideBar from '../../components/SideBar/StudentSideBar'
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

            if (userInfo.is_student === true) {

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
            <StudentSideBar />
            <div className="dashboard-container">
                <div class="row">
                    <div class="card">
                        <h3>STUDENT PROFILE</h3>
                        <p><b>STUDENT NAME</b> :
                            {"    "}
                            {userInfo != null && userInfo.student_first_name}
                            {"    "}
                            {userInfo != null && userInfo.student_last_name}
                        </p>
                        <p><b>STUDENT EMAIL</b> :
                            {"    "}
                            {userInfo != null && userInfo.student_email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
