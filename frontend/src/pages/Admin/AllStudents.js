import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import Header from '../../components/Header/Header'
import AllStudentsTable from '../../components/Tables/AllStudentsTable'

const AllStudents = () => {
    return (
        <div>
            <Header />
            <SideBar />
            <AllStudentsTable />
        </div>
    )
}

export default AllStudents
