import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE, FETCHING_CATEGORIES } from './constants';
import axios from 'axios';

export function fetchCategories() {

    return (dispatch) => {
        dispatch(getCategories())
        axios.get('http://mahasel.feckrah.com/public/api/categories')
            .then(function (response) {
                console.log('categories API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    return(dispatch(getCategoriesSuccess(response.data.data)))
                }
                else{
                    return(dispatch(getCategoriesFailure(err)))
                } 
            })
            .catch(err => dispatch(getCategoriesFailure(err)))
    }
}

function getCategories() {

    return {
        type: FETCHING_CATEGORIES
    }
}

function getCategoriesSuccess(data) {

    return {
        type: FETCH_CATEGORIES_SUCCESS,
        data
    }
}

function getCategoriesFailure() {
    return {
        type: FETCH_CATEGORIES_FAILURE
    }
}