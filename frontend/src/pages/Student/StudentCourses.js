import React from 'react'
import StudentSideBar from '../../components/SideBar/StudentSideBar'
import Header from '../../components/Header/Header'
import StudentCourseTable from '../../components/Tables/StudentCourseTable'

const StudentCourses = () => {
    return (
        <div>
            <Header />
            <StudentSideBar />
            <StudentCourseTable />
        </div>
    )
}

export default StudentCourses
