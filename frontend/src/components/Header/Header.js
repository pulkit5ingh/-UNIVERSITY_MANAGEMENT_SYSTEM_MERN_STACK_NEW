import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/actions/adminAction'
import './Header.css'

const Header = () => {

    const dispatch = useDispatch()

    const adminLogin = useSelector((state) => state.adminLogin)

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div class="header">
            <a style={{ marginLeft: "20%" }}></a>
            <a><b>University of California</b></a>
            <div class="header-right">
                <button className="logout" onClick={logoutHandler}>LOG OUT</button>
                {/* <a href="#contact">Contact</a>
                <a href="#about">About</a> */}
            </div>
        </div>
    )
}

export default Header
