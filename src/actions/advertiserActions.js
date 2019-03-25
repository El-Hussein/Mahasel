import { 
    FETCH_ADS_SUCCESS, 
    FETCH_ADS_FAILURE, 
    FETCHING_ADS,
    
    ADDING_ATTEMPT, 
    ADDED_SUCCESFULLY, 
    ADDING_FAILED, 

    EDITING_ATTEMPT, 
    EDITTED_SUCCESFULLY, 
    EDITING_FAILED, 

    DELETEING_ATTEMPT, 
    DELETED_SUCCESFULLY, 
    DELETEING_FAILED, 
} from './constants';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {AsyncStorage} from 'react-native';
import localization from '../localization/localization';

// fetching ads
export function fetchAds(token) {

    return (dispatch) => {
        dispatch(getAds())
        
        axios('http://mahasel.feckrah.com/public/api/profile/my_ads',{
            method:'GET',
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':'Bearer ' + token
            }
        })
            .then(function (response) {
                console.warn('Ads API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    return(dispatch(getAdsSuccess(response.data.data.ads)))
                }
                else{
                    return(dispatch(getAdsFailure(err)))
                } 
            })
            .catch(err => {dispatch(getAdsFailure(err));console.warn(err)})
    }
}

function getAds() {

    return {
        type: FETCHING_ADS
    }
}

function getAdsSuccess(data) {

    return {
        type: FETCH_ADS_SUCCESS,
        data
    }
}

function getAdsFailure() {
    return {
        type: FETCH_ADS_FAILURE
    }
}

// addingAdvertiser process
export function addingAdvertiser(data) {

    return (dispatch) => {
        dispatch(addingAdvertiserAttempt())
        var qs = require('qs');
        console.warn('from api'+data)
        if(!data.image) return dispatch(addingAdvertiserFailure(localization.selectImage))
        RNFetchBlob.fetch('POST', 'http://mahasel.feckrah.com/public/api/profile/add_new_ad', 
            {
                // 'X-localization':'ar',
                'Content-Type': 'multipart/form-data',
                'RNFB-Response':'utf8',
                Authorization :'Bearer '+data.token
            }, [
                { name: 'title', data: data.name },
                { name: 'description', data: data.des },
                { name: 'content', data: 'content' },
                { name: 'region_id', data: 'region_id' },
                { name: 'category_id', data: ''+data.cat_id },
                { name: 'sub_category_id', data: ''+data.cat_id },
                { name: 'price', data: ''+data.price },
                { name: 'quantity', data: ''+data.quantity },
                { name: 'phone', data: ''+data.phone },
                { name: 'image', filename: 'image.png', type: 'image/png', data: data.image },
                ]).then((response) => response.json())
        .then(function (response) {
            console.warn(response)
            if(response.value){
                console.warn('added successfully');
                return(dispatch(addingAdvertiserSuccess(response.data)))
            }
            else{
                console.warn('error');
                return(dispatch(addingAdvertiserFailure(response.msg)))
            } 
        })
        .catch(err => console.log(err))
    }
}

function addingAdvertiserAttempt() {

    return {
        type: ADDING_ATTEMPT
    }
}

function addingAdvertiserSuccess(data) {

    return {
        type: ADDED_SUCCESFULLY,
        data
    }
}

function addingAdvertiserFailure(msg) {
    return {
        type: ADDING_FAILED,
        msg
    }
}


// editingAdvertiser process
export function editingAdvertiser(data) {
    console.log(data)
    return (dispatch) => {
        dispatch(editingAdvertiserAttempt())
        axios.post('http://mahasel.feckrah.com/public/api/auth/editingAdvertiser', data)
            .then(function (response) {
                console.log('editingAdvertiser API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    user = response.data.data;
                    saveUser(user)
                    return(dispatch(editingAdvertiserSuccess(user)))
                }
                else{
                    errorMSG = response.data.msg;
                    console.log(errorMSG)
                    return(dispatch(editingAdvertiserFailure(errorMSG)))
                } 
            })
            .catch(err => dispatch(editingAdvertiserFailure(err)))
    }
}

async function saveUser(user){
    return await AsyncStorage.setItem('user', JSON.stringify(user)).then((data)=>{
      console.log('user saved successfully, ' + data)
      // async storage should take strings not objects as a paramaters
    }).catch((error)=>{
      console.log('ERROR saving user: ' + error)
    });
}

function editingAdvertiserAttempt() {

    return {
        type: EDITING_ATTEMPT
    }
}

function editingAdvertiserSuccess(data) {

    return {
        type: EDITTED_SUCCESFULLY,
        data
    }
}

function editingAdvertiserFailure(msg) {

    return {
        type: EDITING_FAILED,
        msg
    }
}


// deletingAdvertiser process
export function deletingAdvertiser() {
    
    return (dispatch) => {
        dispatch(deletingAdvertiserAttempt());
        deleteUser(dispatch);
    }
}

async function deleteUser(dispatch){
    return await AsyncStorage.removeItem('user').then((data)=>{
      console.log('user deleted successfully, ' + data)
      dispatch(deletingAdvertiserSuccess());
    }).catch((error)=>{
      console.log('ERROR deleting user: ' + error)
      dispatch(deletingAdvertiserFailure());
    });
}

function deletingAdvertiserAttempt() {

    return {
        type: DELETEING_ATTEMPT
    }
}

function deletingAdvertiserSuccess() {

    return {
        type: DELETED_SUCCESFULLY,
    }
}

function deletingAdvertiserFailure(msg) {
    return {
        type: DELETEING_FAILED,
        msg
    }
}