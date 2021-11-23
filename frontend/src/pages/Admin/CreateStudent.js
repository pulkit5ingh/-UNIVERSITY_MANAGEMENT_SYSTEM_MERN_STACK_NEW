import React from 'react';
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'
import CreateStudentForm from '../../components/Forms/CreateStudentForm'

const CreateStudent = () => {
    return (
        <div>
            <Header />
            <AdminSideBar />
            <CreateStudentForm />
        </div>
    )
}

export default CreateStudent
