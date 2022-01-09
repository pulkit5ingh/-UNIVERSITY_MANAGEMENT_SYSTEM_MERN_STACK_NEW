import axios from 'axios'
import {
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGOUT,
} from '../constants/adminConstants'

// * Admin Login 

export const login = (cnic, password, access_as) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        // alert(cnic, password, access_as)

        // * check access as
        if (access_as === "admin") {

            // alert("ADMIN LOGIN")

            const { data } = await axios.post(
                'http://localhost:5000/api/admin/login',
                { admin_cnic: cnic, admin_password: password },
                config
            )

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
            // alert("TEACHER LOGIN API CALL")
            const { data } = await axios.post(
                'http://localhost:5000/api/teacher/login',
                { teacher_cnic: cnic, teacher_password: password },
                config
            )

            // alert(JSON.stringify(data))

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
        } else if (access_as === "student") {
            // alert("STUDENT LOGIN API CALL")
            const { data } = await axios.post(
                'http://localhost:5000/api/student/login',
                { student_cnic: cnic, student_password: password },
                config
            )

            // alert(JSON.stringify(data))

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
        }
        else {
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
