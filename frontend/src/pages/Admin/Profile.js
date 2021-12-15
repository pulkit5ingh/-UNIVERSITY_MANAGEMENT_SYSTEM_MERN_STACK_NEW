import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'

const Profile = () => {

    // ? ================================== Authentication 
    // * use navigate 
    const navigate = useNavigate();

    // * ==== get user state 
    const adminLogin = useSelector((state) => state.adminLogin)
    const { error, userInfo, message } = adminLogin;

    // alert(JSON.stringify(userInfo))

    // * USE EFFECT REDIRECT TO LOG IN 
    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        }
        if (userInfo) {

            if (userInfo.is_admin === true) {

            }
            else {
                navigate("/");
            }
        }
        else {
            navigate("/");
        }
    }, [navigate, userInfo])

    // * ========================
    // ? ================================== Authentication 

    return (
        <div>
            <Header />
            <AdminSideBar />
            <div className="dashboard-container">
                <div class="row">
                    <div class="card">
                        <h3>ADMIND PROFILE</h3>
                        <p><b>ADMIN NAME</b> :
                            {"    "}
                            {userInfo != null && userInfo.admin_first_name}
                            {"    "}
                            {userInfo != null && userInfo.admin_last_name}
                        </p>
                        <p><b>ADMIN EMAIL</b> :
                            {"    "}
                            {userInfo != null && userInfo.admin_email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
