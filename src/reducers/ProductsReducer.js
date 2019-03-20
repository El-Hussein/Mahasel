import {  FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCHING_PRODUCTS} from '../actions/constants';

const initialState = {
    products: [],
    isFetching: false,
    error: false
}

export default function productsReducer(state = initialState, action) {

    switch(action.type) {
        case FETCHING_PRODUCTS:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: action.data
            }
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}