import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import SideBar from '../../components/SideBar/SideBar'
import Header from '../../components/Header/Header'

const Dashboard = () => {

    // * use navigate 
    const navigate = useNavigate();

    // * ==== get user state 
    const adminLogin = useSelector((state) => state.adminLogin)
    const { loading, error, userInfo, message } = adminLogin;

    // * USE EFFECT REDIRECT TO DASH BOARD 
    useEffect(() => {
        // if (userInfo) {
        // } else {
        //     navigate("/");
        // }
    }, [navigate, userInfo])

    // * ========================

    return (
        <div>
            <Header />
            <SideBar />
        </div>
    )
}

export default Dashboard
