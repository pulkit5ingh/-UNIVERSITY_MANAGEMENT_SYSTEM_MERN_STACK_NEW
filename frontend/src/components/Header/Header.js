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
            <a href="#default" class="logo">CompanyLogo</a>
            <div class="header-right">
                {/* <a class="active" href="#home">HELLO ADMIN</a> */}
                <button className="logout" onClick={logoutHandler}>LOG OUT</button>
                {/* <a href="#contact">Contact</a>
                <a href="#about">About</a> */}
            </div>
        </div>
    )
}

export default Header
