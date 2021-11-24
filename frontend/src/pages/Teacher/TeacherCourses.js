import React from 'react'
import TeacherSideBar from '../../components/SideBar/TeacherSideBar'
import Header from '../../components/Header/Header'
import TeacherCourseTable from '../../components/Tables/TeacherCourseTable'

const StudentCourses = () => {
    return (
        <div>
            <Header />
            <TeacherSideBar />
            <TeacherCourseTable />
        </div>
    )
}

export default StudentCourses
