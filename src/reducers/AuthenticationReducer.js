import { LOGIN_ATTEMPT, LOGIN_FAILED, LOGIN_SUCCESFULLY } from '../actions/constants';

const initialState = {
    user: {},
    isLoging: false,
    error: false
}

export default function AuthenticationReducer(state = initialState, action) {

    switch(action.type) {
        case LOGIN_ATTEMPT:
            return {
                ...state,
                isFetching: false,
                user: action.data
            }
        case LOGIN_SUCCESFULLY:
            return {
                ...state,
                isFetching: true
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}