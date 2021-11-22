import {
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGOUT,
} from '../constants/adminConstants'

export const adminLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_LOGIN_REQUEST:
            return { loading: true }
        case ADMIN_LOGIN_SUCCESS:
            return { loading: false, error: false, userInfo: action.payload, message: action.message }
        case ADMIN_LOGIN_FAIL:
            return { loading: false, error: true, message: action.message }
        case ADMIN_LOGOUT:
            return {}
        default:
            return state
    }
}