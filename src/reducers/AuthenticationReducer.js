import { 
    REGISTER_ATTEMPT, 
    REGISTER_SUCCESFULLY, 
    REGISTER_FAILED, 

    LOGIN_ATTEMPT, 
    LOGIN_SUCCESFULLY, 
    LOGIN_FAILED, 

    LOGOUT_ATTEMPT, 
    LOGOUT_SUCCESFULLY, 
    LOGOUT_FAILED, 

    LOGIN_PASS,
} from '../actions/constants';

const initialState = {
    user: {},
    isRegistring: false,
    isLoging: false,
    isLogingOut: false,
    error:null,
}

export default function AuthenticationReducer(state = initialState, action) {

    switch(action.type) {
        // REGISTER ACTIONS Hanlders
        case REGISTER_ATTEMPT:
        return {
            ...state,
            isRegistring: true,
        }
        case REGISTER_SUCCESFULLY:
        return {
            ...state,
                isRegistring: false,
                user: action.data,
                error:null,
            }
            case REGISTER_FAILED:
            return {
                ...state,
                isRegistring: false,
                user:{},
                error: action.msg
            }
            
        // LOGIN ACTIONS Hanlders
        case LOGIN_ATTEMPT:
            return {
                ...state,
                isLoging: true,
            }
        case LOGIN_SUCCESFULLY:
            return {
                ...state,
                isLoging: false,
                user: action.data,
                error:null,
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isLoging: false,
                user:{},
                error: action.msg
            }

        // LOGOUT ACTIONS Hanlders
        case LOGOUT_ATTEMPT:
            return {
                ...state,
                isLogingOut: true,
            }
        case LOGOUT_SUCCESFULLY:
            return {
                ...state,
                isLogingOut: false,
                user: {},
                error:null,
            }
        case LOGOUT_FAILED:
            return {
                ...state,
                isLogingOut: false,
                error: action.msg
            }

        case LOGIN_PASS:
            return {
                ...state,
                isLoging: false,
                user: action.data,
                error:null,
            }
        default:
            return state
    }
}