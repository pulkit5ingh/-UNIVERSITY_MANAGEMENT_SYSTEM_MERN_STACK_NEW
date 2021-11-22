import React from 'react';
import SideBar from '../../components/SideBar/SideBar'
import Header from '../../components/Header/Header'
import CreateTeacherForm from '../../components/Forms/CreateTeacherForm'

const CreateStudent = () => {
    return (
        <div>
            <Header />
            <SideBar />
            <CreateTeacherForm />
        </div>
    )
}

export default CreateStudent
