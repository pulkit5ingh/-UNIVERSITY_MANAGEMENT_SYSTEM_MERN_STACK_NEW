import React from 'react'
import StudentSideBar from '../../components/SideBar/StudentSideBar'
import Header from '../../components/Header/Header'
import ShowAllStudentAttendanceTable from '../../components/Tables/ShowAllStudentAttendanceTable'

const StudentAttendanceTable = () => {
    return (
        <div>
            <Header />
            <StudentSideBar />
            <ShowAllStudentAttendanceTable />
        </div>
    )
}

export default StudentAttendanceTable
