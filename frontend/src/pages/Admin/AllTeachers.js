import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import Header from '../../components/Header/Header'
import AllTeachersTable from '../../components/Tables/AllTeachersTable'

const AllTeachers = () => {
    return (
        <div>
            <Header />
            <SideBar />
            <AllTeachersTable />
        </div>
    )
}

export default AllTeachers
