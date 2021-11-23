import React from 'react'
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'

const Profile = () => {
    return (
        <div>
            <Header />
            <AdminSideBar />
            <div className="dashboard-container">
                <div class="row">
                    <div class="card">
                        <h3>ADMIND PROFILE</h3>
                        <p>Some text</p>
                        <p>Some text</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
