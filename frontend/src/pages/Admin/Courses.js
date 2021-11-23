import React from 'react'
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'
import AdminCourseTable from '../../components/Tables/AdminCourseTable'

const Courses = () => {
    return (
        <div>
            <Header />
            <AdminSideBar />
            <AdminCourseTable />
        </div>
    )
}

export default Courses
