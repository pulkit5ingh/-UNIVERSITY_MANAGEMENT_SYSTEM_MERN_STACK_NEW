import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import TeacherSideBar from '../../components/SideBar/TeacherSideBar'
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

    // * ========================

    return (
        <div>
            <Header />
            <TeacherSideBar />
            <div className="dashboard-container">
                <div class="row">
                    <div class="column">
                        <div class="card">
                            <h3><i class="fas fa-user fa-3x"></i></h3>
                            <p><b></b></p>
                            <p><b>TEACHER SHOW PROFILE DETAILS</b></p>
                        </div>
                    </div>

                    <div class="column">
                        <div class="card">
                            <h3><i class="fas fa-user-graduate fa-3x"></i></h3>
                            <p><b>TEACHER CAN READ ALL THE ASSIGNED COURSES WITH STUDENTS</b></p>
                        </div>
                    </div>

                    <div class="column">
                        <div class="card">
                            <h3><i class="fas fa-chalkboard-teacher fa-3x"></i></h3>
                            <p><b>TEACHER CAN READ AND CREATE ATTENDANCE OF THE STUDENT</b></p>
                        </div>
                    </div>

                    <div class="column">
                        <div class="card">
                            <h3><i class="fas fa-poll-h fa-3x"></i></h3>
                            <p><b>TEACHER CAN SELECT STUDENT AND CREATE MARKS</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
