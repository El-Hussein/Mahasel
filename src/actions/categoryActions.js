import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE, FETCHING_CATEGORIES } from './constants';
import axios from 'axios';
import {LocalStorage} from '../localStorage/LocalStorage';
export function fetchCategories() {
    return (dispatch) => {
        dispatch(getCategories())
        console.log('res ' + LocalStorage.lang);
        axios.get('http://mahasel.feckrah.com/public/api/categories', {headers:{'X-localization':LocalStorage.lang}})
            .then(function (response) {
                console.log('categories API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    return(dispatch(getCategoriesSuccess(response.data.data)))
                }
                else{
                    return(dispatch(getCategoriesFailure('network error')))
                } 
            })
            .catch(err => dispatch(getCategoriesFailure('network error')))
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