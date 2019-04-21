import { FETCH_TERMS_SUCCESS, FETCH_TERMS_FAILURE, FETCHING_TERMS } from './constants';
import axios from 'axios';
import {LocalStorage} from '../localStorage/LocalStorage';
export function fetchTerms() {
    return (dispatch) => {
        dispatch(getTerms())
        console.warn('res ' + LocalStorage.lang);
        axios.get('http://mahasel.feckrah.com/public/api/terms', {headers:{'X-localization':LocalStorage.lang}})
            .then(function (response) {
                console.log('Terms API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    return(dispatch(getTermsSuccess(response.data.data)))
                }
                else{
                    return(dispatch(getTermsFailure(err)))
                } 
            })
            .catch(err => dispatch(getTermsFailure(err)))
    }
}

function getTerms() {

    return {
        type: FETCHING_TERMS
    }
}

function getTermsSuccess(data) {

    return {
        type: FETCH_TERMS_SUCCESS,
        data
    }
}

function getTermsFailure() {
    return {
        type: FETCH_TERMS_FAILURE
    }
}