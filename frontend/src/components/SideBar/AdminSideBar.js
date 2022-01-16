import React from 'react'
import { Link } from 'react-router-dom'
import './SideBar.css'

const SideBar = () => {
    return (
        <header class="sidebar-header" role="banner">
            <h1 class="logo">
                <a><b>Hello ADMIN</b></a>
            </h1>
            <div class="nav-wrap">
                <nav class="main-nav" role="navigation">
                    <ul class="unstyled list-hover-slide">
                        <li><Link to="/admin/dashboard"><a>DASHBOARD</a></Link></li>
                        <li><Link to="/admin/profile"><a>PROFILE</a></Link></li>
                        <li><Link to="/admin/all-students"><a>STUDENTS</a></Link></li>
                        <li><Link to="/admin/all-teachers"><a>TEACHERS</a></Link></li>
                        <li><Link to="/admin/courses"><a>COURSES</a></Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default SideBar
