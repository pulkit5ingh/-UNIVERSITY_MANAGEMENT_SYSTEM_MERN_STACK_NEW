import React from 'react';
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'
import CreateTeacherForm from '../../components/Forms/CreateTeacherForm'

const CreateStudent = () => {
    return (
        <div>
            <Header />
            <AdminSideBar />
            <CreateTeacherForm />
        </div>
    )
}

export default CreateStudent
