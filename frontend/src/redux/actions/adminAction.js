import axios from 'axios'
import {
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGOUT,
} from '../constants/adminConstants'

// * Admin Login 

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            'http://localhost:5000/api/admin/login',
            { admin_email: email, admin_password: password },
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
