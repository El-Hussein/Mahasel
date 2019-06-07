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

    DELETING_ATTEMPT, 
    DELETED_SUCCESFULLY, 
    DELETING_FAILED, 
} from './constants';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {AsyncStorage} from 'react-native';
import localization from '../localization/localization';
import { LocalStorage } from '../localStorage/LocalStorage';

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
                    return(dispatch(getAdsFailure('network fialed')))
                } 
            })
            .catch(err => {dispatch(getAdsFailure('network fialed'));console.warn('network fialed')})
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
    // langauge().then((respone)=>{console.warn('res ' + respone)});
    return (dispatch) => {
        dispatch(addingAdvertiserAttempt())
        if(!data.image) return dispatch(addingAdvertiserFailure(localization.selectImage))
        formData = new FormData();
        formData.append('title', data.name)
        formData.append('description', data.des)
        formData.append('content', data.des)
        formData.append('category_id', data.cat_id)
        formData.append('sub_category_id', data.cat_id)
        formData.append('region_id', data.cat_id)
        formData.append('city_id', data.city_id)
        formData.append('price', data.price)
        formData.append('phone', data.phone)
        formData.append('quantity', data.quantity)
        formData.append('image', {uri:data.image, name:'profile.png', type:'image/png'})
        fetch( 'http://mahasel.feckrah.com/public/api/profile/add_new_ad', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + data.token,
            'X-localization' : LocalStorage.lang
            },
            body: formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // Perform success response.
            console.log('respones' + JSON.stringify(responseJson));
            if(responseJson.value){
                return(dispatch(addingAdvertiserSuccess(responseJson.data)))
            }
            else{
                return(dispatch(addingAdvertiserFailure(responseJson.msg)))
            } 
        })
        .catch((error) => {
            console.log('network fialed')
        });
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
            .catch(err => dispatch(editingAdvertiserFailure('network fialed')))
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
export function deleteAds(token, id) {
    console.warn('entered')
    return (dispatch) => {
        // dispatch(deletingAdvertiserAttempt());
        axios('http://mahasel.feckrah.com/public/api/profile/delete_ad/' + id,{
            method:'DELETE',
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
            .then(function (response) {
                console.warn('Ads API response: ' + (response.data))
                if(response.data.value){
                    return(dispatch(deletingAdvertiserSuccess()))
                }
                else{
                    return(dispatch(deletingAdvertiserFailure(response.data)))
                } 
            })
            .catch(err => {dispatch(deletingAdvertiserFailure('network fialed'));console.warn('network fialed')})
    }
}

function deletingAdvertiserAttempt() {

    return {
        type: DELETING_ATTEMPT,
    }
}

function deletingAdvertiserSuccess() {

    return {
        type: DELETED_SUCCESFULLY,
    }
}

function deletingAdvertiserFailure(msg) {
    return {
        type: DELETING_FAILED,
        msg
    }
}