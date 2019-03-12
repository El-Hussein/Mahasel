import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE, FETCHING_CATEGORIES } from '../actions/constants';

const initialState = {
    categories: [],
    isFetching: false,
    error: false
}

export default function categoriesReducer(state = initialState, action) {

    switch(action.type) {
        case FETCHING_CATEGORIES:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                categories: action.data
            }
        case FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}