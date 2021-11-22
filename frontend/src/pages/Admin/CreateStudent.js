import React from 'react';
import SideBar from '../../components/SideBar/SideBar'
import Header from '../../components/Header/Header'
import CreateStudentForm from '../../components/Forms/CreateStudentForm'

const CreateStudent = () => {
    return (
        <div>
            <Header />
            <SideBar />
            <CreateStudentForm />
        </div>
    )
}

export default CreateStudent
