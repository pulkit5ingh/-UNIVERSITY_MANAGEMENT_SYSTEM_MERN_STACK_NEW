import React from 'react'
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'
import AllStudentsTable from '../../components/Tables/AllStudentsTable'

const AllStudents = () => {
    return (
        <div>
            <Header />
            <AdminSideBar />
            <AllStudentsTable />
        </div>
    )
}

export default AllStudents
