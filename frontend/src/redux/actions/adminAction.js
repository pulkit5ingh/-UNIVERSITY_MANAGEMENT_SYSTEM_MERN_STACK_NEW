import axios from 'axios'
import {
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGOUT,
} from '../constants/adminConstants'

// * Admin Login 

export const login = (admin_cnic, password, access_as) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        alert(admin_cnic, password, access_as)

        // * check access as
        if (access_as === "admin") {

            alert("ADMIN LOGIN")

            const { data } = await axios.post(
                'http://localhost:5000/api/admin/login',
                { admin_cnic: admin_cnic, admin_password: password },
                config
            )

            console.log(data)

            if (data.status === "success") {
                dispatch({
                    type: ADMIN_LOGIN_SUCCESS,
                    payload: data.response,
                    message: data.message,
                })
                localStorage.setItem('userInfo', JSON.stringify(data.response))

            } else {
                dispatch({
                    type: ADMIN_LOGIN_FAIL,
                    payload: data.response,
                    message: data.message,
                })
            }
        } else if (access_as === "teacher") {
            const { data } = await axios.post(
                'http://localhost:5000/api/teacher/login',
                { admin_cnic: admin_cnic, admin_password: password },
                config
            )

            console.log(data)

            if (data.status === "success") {
                dispatch({
                    type: ADMIN_LOGIN_SUCCESS,
                    payload: data.response,
                    message: data.message,
                })
                localStorage.setItem('userInfo', JSON.stringify(data.response))

            } else {
                dispatch({
                    type: ADMIN_LOGIN_FAIL,
                    payload: data.response,
                    message: data.message,
                })

            }
        } else {
            alert(JSON.stringify("SOMETHING WENT WRONG !"))
        }

    } catch (error) {
        dispatch({
            type: ADMIN_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: ADMIN_LOGOUT })
    document.location.href = '/'
}
