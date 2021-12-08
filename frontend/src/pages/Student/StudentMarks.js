import React from 'react'
import StudentSideBar from '../../components/SideBar/StudentSideBar'
import Header from '../../components/Header/Header'
import StudentMarksTable from '../../components/Tables/StudentMarksTable'

const StudentCourses = () => {
    return (
        <div>
            <Header />
            <StudentSideBar />
            <StudentMarksTable />
        </div>
    )
}

export default StudentCourses
