import React from 'react'
import TeacherSideBar from '../../components/SideBar/TeacherSideBar'
import Header from '../../components/Header/Header'

const Profile = () => {
    return (
        <div>
            <Header />
            <TeacherSideBar />
            <div className="dashboard-container">
                <div class="row">
                    <div class="card">
                        <h3>TEACHER PROFILE</h3>
                        <p>Some text</p>
                        <p>Some text</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
