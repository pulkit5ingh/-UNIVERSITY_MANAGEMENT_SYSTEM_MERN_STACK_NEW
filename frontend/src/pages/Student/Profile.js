import React from 'react'
import StudentSideBar from '../../components/SideBar/StudentSideBar'
import Header from '../../components/Header/Header'

const Profile = () => {
    return (
        <div>
            <Header />
            <StudentSideBar />
            <div className="dashboard-container">
                <div class="row">
                    <div class="card">
                        <h3>STUDENT PROFILE</h3>
                        <p>Some text</p>
                        <p>Some text</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
