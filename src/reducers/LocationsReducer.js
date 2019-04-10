import { 
    FETCH_COUNTRIES_SUCCESS, 
    FETCH_COUNTRIES_FAILURE, 
    FETCHING_COUNTRIES,
    
    FETCH_CITIES_SUCCESS, 
    FETCH_CITIES_FAILURE, 
    FETCHING_CITIES,
} from '../actions/constants';

const initialState = {
    countries: null,
    cities: null,
    isFetching: false,
    error: false
}

export default function locationsReducer(state = initialState, action) {

    switch(action.type) {
        case FETCHING_CITIES:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_CITIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                cities: action.data
            }
        case FETCH_CITIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }

        case FETCHING_COUNTRIES:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                countries: action.data
            }
        case FETCH_COUNTRIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}