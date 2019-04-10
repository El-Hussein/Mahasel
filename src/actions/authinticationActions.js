import { 
    REGISTER_ATTEMPT, 
    REGISTER_SUCCESFULLY, 
    REGISTER_FAILED, 

    LOGIN_ATTEMPT, 
    LOGIN_SUCCESFULLY, 
    LOGIN_FAILED, 

    LOGOUT_ATTEMPT, 
    LOGOUT_SUCCESFULLY, 
    LOGOUT_FAILED, 

    UPDATE_PROFILE_ATTEMPT,
    UPDATE_PROFILE_SUCCESFULLY,
    UPDATE_PROFILE_FAILED,
    
    LOGIN_PASS,
    LOGIN_PASS_TOKEN,
} from './constants';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {AsyncStorage} from 'react-native';
import localization from '../localization/localization';
import { LocalStorage } from '../localStorage/LocalStorage';
// register process
export function register(data) {
    // console.log(lang);
    return (dispatch) => {
        dispatch(registerAttempt())
        var qs = require('qs');
        // console.log(data)
        // if(!data.image) return dispatch(addingAdvertiserFailure(localization.selectImage))
        formData = new FormData();
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('password', data.password)
        formData.append('country', data.country)
        formData.append('city', data.city)
        formData.append('address', data.address)
        formData.append('image', {uri:data.image, name:'profile.png', type:'image/png'})
        fetch( 'http://mahasel.feckrah.com/public/api/auth/register', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'X-localization' : LocalStorage.lang
            },
            body: formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.value){
                user = responseJson.data;
                // console.log(user)
                saveUser(user)
                saveUserToken(user.token)
                return(dispatch(registerSuccess(user)))
            }
            else{
                // console.log('errooor: ' + JSON.stringify(responseJson))

                return(dispatch(registerFailure(responseJson.msg)))
            } 
        })
        // .catch(err => console.log('error: ' + err))
    }
}

function registerAttempt() {
    return {
        type: REGISTER_ATTEMPT
    }
}

function registerSuccess(data) {

    return {
        type: REGISTER_SUCCESFULLY,
        data
    }
}

function registerFailure(msg) {
    return {
        type: REGISTER_FAILED,
        msg
    }
}


// login process
export function login(data) {
    // console.log(data)
    return (dispatch) => {
        dispatch(loginAttempt())
        axios.post('http://mahasel.feckrah.com/public/api/auth/login', data, {headers:{'X-localization':LocalStorage.lang}})
            .then(function (response) {
                // console.log('Login API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    user = response.data.data;
                    saveUser(user)
                    saveUserToken(user.token)
                    return(dispatch(loginSuccess(user)))
                }
                else{
                    errorMSG = response.data.msg;
                    // console.log(errorMSG)
                    return(dispatch(loginFailure(errorMSG)))
                } 
            })
            .catch(err => dispatch(loginFailure(err)))
    }
}

async function saveUser(user){
    return await AsyncStorage.setItem('user', JSON.stringify(user)).then((data)=>{
    //   console.log('user saved successfully, ' + data)
      // async storage should take strings not objects as a paramaters
    }).catch((error)=>{
    //   console.log('ERROR saving user: ' + error)
    });
}

async function saveUserToken(userToken){
    return await AsyncStorage.setItem('userToken', JSON.stringify(userToken)).then((data)=>{
    //   console.log('userToken saved successfully, ' + data)
      // async storage should take strings not objects as a paramaters
    }).catch((error)=>{
    //   console.log('ERROR saving userToken: ' + error)
    });
}

function loginAttempt() {

    return {
        type: LOGIN_ATTEMPT
    }
}

function loginSuccess(data) {

    return {
        type: LOGIN_SUCCESFULLY,
        data
    }
}

function loginFailure(msg) {

    return {
        type: LOGIN_FAILED,
        msg
    }
}


// logout process
export function logout() {
    
    return (dispatch) => {
        dispatch(logoutAttempt());
        deleteUser(dispatch);
    }
}

async function deleteUser(dispatch){
    return await AsyncStorage.removeItem('user').then((data)=>{
    //   console.log('user deleted successfully, ' + data)
      dispatch(logoutSuccess());
    }).catch((error)=>{
    //   console.log('ERROR deleting user: ' + error)
      dispatch(logoutFailure());
    });
}

function logoutAttempt() {

    return {
        type: LOGOUT_ATTEMPT
    }
}

function logoutSuccess() {

    return {
        type: LOGOUT_SUCCESFULLY,
    }
}

function logoutFailure(msg) {
    return {
        type: LOGOUT_FAILED,
        msg
    }
}

// login pass 
export function loginPass(data) {
    return (dispatch) => {
        dispatch(loginPassSuccess(data))
    }
}

function loginPassSuccess(data){
    return {
        type: LOGIN_PASS,
        data
    }
}

export function loginPassToken(accesToken) {
    // console.log(accesToken)
    return (dispatch) => {
        dispatch(loginPassTokenSuccess(accesToken))
    }
}

function loginPassTokenSuccess(accesToken){
    return {
        type: LOGIN_PASS_TOKEN,
        accesToken
    }
}


// update profile process
export function updateProfile(data) {
    // console.log('did it reached here?')
    return (dispatch) => {
        dispatch(updateProfileAttempt())
        console.warn('from api: '+JSON.stringify(data))
        // if(!data.image) return dispatch(updateProfileFailure(localization.selectImage))
        formData = new FormData();
        if(data.name)
            formData.append('name', data.name)
        if(data.email)
            formData.append('email', data.email)
        if(data.phone)
            formData.append('phone', data.phone)
        if(data.password)
            formData.append('password', data.password)
        if(data.image)
            formData.append('image', {uri:data.image, name:'profile.png', type:'image/png'})
        fetch( 'http://mahasel.feckrah.com/public/api/user/update/profile', {
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
            console.warn('respones: ' + JSON.stringify(responseJson));
            if(responseJson.value){
                user = responseJson.data;
                saveUser(user)
                console.warn('added successfully' + responseJson.data);
                return(dispatch(updateProfileSuccess(responseJson.data)))
            }
            else{
                console.warn('error');
                return(dispatch(updateProfileFailure(responseJson.msg)))
            } 
        })
        .catch((error) => {
            console.warn('error: ' + error)
        });
    }
}

function updateProfileAttempt() {
    return {
        type: UPDATE_PROFILE_ATTEMPT
    }
}

function updateProfileSuccess(data) {

    return {
        type: UPDATE_PROFILE_SUCCESFULLY,
        data
    }
}

function updateProfileFailure(msg) {
    return {
        type: UPDATE_PROFILE_FAILED,
        msg
    }
}