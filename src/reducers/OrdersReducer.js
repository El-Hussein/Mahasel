import {  FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE, FETCHING_ORDERS} from '../actions/constants';

const initialState = {
    orders: [],
    isFetching: false,
    error: false
}

export default function productsReducer(state = initialState, action) {

    switch(action.type) {
        case FETCHING_ORDERS:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: action.data
            }
        case FETCH_ORDERS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}