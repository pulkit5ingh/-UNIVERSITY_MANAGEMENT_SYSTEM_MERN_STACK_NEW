import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import StudentSideBar from '../../components/SideBar/StudentSideBar'
import Header from '../../components/Header/Header'
import StudentCourseTable from '../../components/Tables/StudentCourseTable'

const StudentCourses = () => {

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
            <StudentCourseTable />
        </div>
    )
}

export default StudentCourses
