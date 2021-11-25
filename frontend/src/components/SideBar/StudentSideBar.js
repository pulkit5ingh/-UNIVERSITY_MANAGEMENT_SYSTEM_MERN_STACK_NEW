import React from 'react'
import { Link } from 'react-router-dom'
import './SideBar.css'

const StudentSideBar = () => {
    return (
        <header class="sidebar-header" role="banner">
            <h1 class="logo">
                <a>Hello <span>STUDENT</span></a>
            </h1>
            <div class="nav-wrap">
                <nav class="main-nav" role="navigation">
                    <ul class="unstyled list-hover-slide">
                        <li><Link to="/student/dashboard"><a>DASHBOARD</a></Link></li>
                        <li><Link to="/student/profile"><a>PROFILE</a></Link></li>
                        <li><Link to="/student/courses"><a>COURSES</a></Link></li>
                        <li><Link to="/student/attendance"><a>ATTENDANCE</a></Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default StudentSideBar
