import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'

const Dashboard = () => {

    // * use navigate 
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

    return (
        <div>
            <Header />
            <AdminSideBar />

            <div className="dashboard-container">
                <div class="row">
                    <div class="column">
                        <div class="card">
                            <h3><i class="fas fa-user fa-3x"></i></h3>
                            <p><b></b></p>
                            <p><b> ADMIN SHOW PROFILE DETAILS</b></p>
                        </div>
                    </div>

                    <div class="column">
                        <div class="card">
                            <h3><i class="fas fa-user-graduate fa-3x"></i></h3>
                            <p><b>ADMIN CREATE READ UPDATE DELETE STUDENTS</b></p>
                        </div>
                    </div>

                    <div class="column">
                        <div class="card">
                            <h3><i class="fas fa-chalkboard-teacher fa-3x"></i></h3>
                            <p><b>ADMIN CREATE READ UPDATE DELETE TEACHER</b></p>
                        </div>
                    </div>

                    <div class="column">
                        <div class="card">
                            <h3><i class="fas fa-book fa-3x"></i></h3>
                            <p><b>ADMIN ASSIGN STUDENTS AND TACHERS TO THE AVAILABLE COURSES</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
