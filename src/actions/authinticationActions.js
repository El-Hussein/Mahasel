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
} from './constants';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {AsyncStorage} from 'react-native';
import localization from '../localization/localization';

// register process
export function register(data) {

    return (dispatch) => {
        dispatch(registerAttempt())
        var qs = require('qs');
        console.log(data)
        // if(!data.image) return dispatch(registerFailure(localization.selectImage))
        RNFetchBlob.fetch('POST', 'http://mahasel.feckrah.com/public/api/auth/register', 
            {
                // 'X-localization':'ar',
                'Content-Type': 'multipart/form-data',
                'RNFB-Response':'utf8'
            }, [
                { name: 'name', data: data.name },
                { name: 'email', data: data.email },
                { name: 'phone', data: data.phone },
                { name: 'password', data: data.password },
                { name: 'image', filename: 'image.png', type: 'image/png', data: data.image },
                ]).then((response) => response.json())
        .then(function (response) {
            if(response.value){
                user = response.data;
                saveUser(user)
                return(dispatch(registerSuccess(user)))
            }
            else{
                return(dispatch(registerFailure(response.msg)))
            } 
    
            console.log(tempMSG);
        })
        .catch(err => console.log(err))
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
    console.log(data)
    return (dispatch) => {
        dispatch(loginAttempt())
        axios.post('http://mahasel.feckrah.com/public/api/auth/login', data)
            .then(function (response) {
                console.log('Login API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    user = response.data.data;
                    saveUser(user)
                    return(dispatch(loginSuccess(user)))
                }
                else{
                    errorMSG = response.data.msg;
                    console.log(errorMSG)
                    return(dispatch(loginFailure(errorMSG)))
                } 
            })
            .catch(err => dispatch(loginFailure(err)))
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
      console.log('user deleted successfully, ' + data)
      dispatch(logoutSuccess());
    }).catch((error)=>{
      console.log('ERROR deleting user: ' + error)
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


// update profile process
export function updateProfile(data) {
    console.log('did it reached here?')
    return (dispatch) => {
        dispatch(updateProfileAttempt())
        var qs = require('qs');
        console.log('from api: '+JSON.stringify(data))
        if(!data.image) return dispatch(updateProfileFailure(localization.selectImage))
        formData = new FormData();
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('password', data.password)
        formData.append('image', {uri:data.image, name:'profile.png', type:'image/png'})
        fetch( 'http://mahasel.feckrah.com/public/user/update/profile', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + data.token
            },
            body: formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // Perform success response.
            console.log('respones: ' + JSON.stringify(responseJson));
            if(responseJson.value){
                console.warn('added successfully');
                return(dispatch(updateProfileSuccess(responseJson.data)))
            }
            else{
                console.warn('error');
                return(dispatch(updateProfileFailure(responseJson.msg)))
            } 
        })
        .catch((error) => {
            console.log('error: ' + error)
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