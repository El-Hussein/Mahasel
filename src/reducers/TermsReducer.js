import { FETCH_TERMS_SUCCESS, FETCH_TERMS_FAILURE, FETCHING_TERMS } from '../actions/constants';

const initialState = {
    terms: null,
    isFetching: false,
    error: false
}

export default function termsReducer(state = initialState, action) {

    switch(action.type) {
        case FETCHING_TERMS:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_TERMS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                terms: action.data
            }
        case FETCH_TERMS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}