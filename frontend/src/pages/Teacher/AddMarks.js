import React from 'react'
import TeacherSideBar from '../../components/SideBar/TeacherSideBar'
import Header from '../../components/Header/Header'
import AddMarksToStudentsForm from '../../components/Forms/AddMarksToStudentsForm'

const TeacherAddMarks = () => {
    return (
        <div>
            <Header />
            <TeacherSideBar />
            <AddMarksToStudentsForm />
        </div>
    )
}

export default TeacherAddMarks
