import React from 'react'
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'
import AllTeachersTable from '../../components/Tables/AllTeachersTable'

const AllTeachers = () => {
    return (
        <div>
            <Header />
            <AdminSideBar />
            <AllTeachersTable />
        </div>
    )
}

export default AllTeachers
