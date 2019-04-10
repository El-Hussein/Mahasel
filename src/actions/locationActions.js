import { 
    FETCH_COUNTRIES_SUCCESS, 
    FETCH_COUNTRIES_FAILURE, 
    FETCHING_COUNTRIES,
    
    FETCH_CITIES_SUCCESS, 
    FETCH_CITIES_FAILURE, 
    FETCHING_CITIES,
} from './constants';
import axios from 'axios';
import {LocalStorage} from '../localStorage/LocalStorage';

export function fetchCountries() {
    return (dispatch) => {
        dispatch(getCountries())
        console.log('res ' + LocalStorage.lang);
        axios.get('http://mahasel.feckrah.com/public/api/locations/countries', {headers:{'X-localization':LocalStorage.lang}})
            .then(function (response) {
                console.log('Countries API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    return(dispatch(getCountriesSuccess(response.data.data)))
                }
                else{
                    return(dispatch(getCountriesFailure(err)))
                } 
            })
            .catch(err => dispatch(getCountriesFailure(err)))
    }
}

function getCountries() {

    return {
        type: FETCHING_COUNTRIES
    }
}

function getCountriesSuccess(data) {

    return {
        type: FETCH_COUNTRIES_SUCCESS,
        data
    }
}

function getCountriesFailure() {
    return {
        type: FETCH_COUNTRIES_FAILURE
    }
}


export function fetchCities(id) {
    return (dispatch) => {
        dispatch(getCities())
        console.log('res ' + LocalStorage.lang);
        axios.get('http://mahasel.feckrah.com/public/api/locations/cities/' + id, {headers:{'X-localization':LocalStorage.lang}})
            .then(function (response) {
                console.log('Cities API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    return(dispatch(getCitiesSuccess(response.data.data)))
                }
                else{
                    return(dispatch(getCitiesFailure(err)))
                } 
            })
            .catch(err => dispatch(getCitiesFailure(err)))
    }
}

function getCities() {

    return {
        type: FETCHING_CITIES
    }
}

function getCitiesSuccess(data) {

    return {
        type: FETCH_CITIES_SUCCESS,
        data
    }
}

function getCitiesFailure() {
    return {
        type: FETCH_CITIES_FAILURE
    }
}