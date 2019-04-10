import { 
    FETCH_ADS_FAILURE,
    FETCH_ADS_SUCCESS,
    FETCHING_ADS,

    ADDING_ATTEMPT, 
    ADDED_SUCCESFULLY, 
    ADDING_FAILED, 

    EDITING_ATTEMPT, 
    EDITTED_SUCCESFULLY, 
    EDITING_FAILED, 

    DELETING_ATTEMPT, 
    DELETED_SUCCESFULLY, 
    DELETING_FAILED, 
} from '../actions/constants';

const initialState = {
    ads: {},
    isAdding: false,
    isEditting: false,
    isDeleting: false,
    error:null,
}

export default function AdvertiserReducer(state = initialState, action) {

    switch(action.type) {
        // FETCHING ADS Handlers
        case FETCHING_ADS:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_ADS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ads: action.data
            }
        case FETCH_ADS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }

        // ADDING ADS ACTIONS Hanlders
        case ADDING_ATTEMPT:
            return {
                ...state,
                isAdding: true,
            }
        case ADDED_SUCCESFULLY:
            return {
                ...state,
                isAdding: false,
                ads: {...ads, ...action.data},
                error:null,
            }
        case ADDING_FAILED:
            return {
                ...state,
                isAdding: false,
                ads:{},
                error: action.msg
            }
            
        // EDITING ADS ACTIONS Hanlders
        case EDITING_ATTEMPT:
            return {
                ...state,
                isEditting: true,
            }
        case EDITTED_SUCCESFULLY:
            return {
                ...state,
                isEditting: false,
                ads: action.data,
                error:null,
            }
        case EDITING_FAILED:
            return {
                ...state,
                isEditting: false,
                ads:{},
                error: action.msg
            }

        // DELETING ADS ACTIONS Hanlders
        case DELETING_ATTEMPT:
            return {
                ...state,
                isDeleting: true,
            }
        case DELETED_SUCCESFULLY:
            return {
                ...state,
                isDeleting: false,
                error:null,
            }
        case DELETING_FAILED:
            return {
                ...state,
                isDeleting: false,
                error: action.msg
            }
            
        default:
            return state
    }
}