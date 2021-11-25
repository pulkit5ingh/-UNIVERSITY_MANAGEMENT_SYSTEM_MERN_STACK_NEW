import React from 'react'
import TeacherSideBar from '../../components/SideBar/TeacherSideBar'
import Header from '../../components/Header/Header'
import TeacherCreateAttendanceForm from '../../components/Forms/TeacherCreateAttendanceForm'

const TeacherAddAttendance = () => {
    return (
        <div>
            <Header />
            <TeacherSideBar />
            <TeacherCreateAttendanceForm />
        </div>
    )
}

export default TeacherAddAttendance
