import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import TeacherSideBar from '../../components/SideBar/TeacherSideBar'
import Header from '../../components/Header/Header'
import TeacherCreateAttendanceForm from '../../components/Forms/TeacherCreateAttendanceForm'

const TeacherAddAttendance = () => {

    // * ======================== authentication
    const navigate = useNavigate();

    // * ==== get user state 
    const adminLogin = useSelector((state) => state.adminLogin)
    const { loading, error, userInfo, message } = adminLogin;

    alert(JSON.stringify(userInfo))

    // * USE EFFECT REDIRECT TO LOG IN 
    useEffect(() => {
        alert(JSON.stringify(userInfo))
        if (!userInfo || userInfo === 'undefined') {
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
            <TeacherCreateAttendanceForm />
        </div>
    )
}

export default TeacherAddAttendance
