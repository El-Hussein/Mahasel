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
} from './constants';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

// register process
export function register(data) {

    return (dispatch) => {
        dispatch(registerAttempt())
        var qs = require('qs');
        console.log(qs.stringify(data))
        fetch('http://mahasel.feckrah.com/public/api/auth/register', {
            method:'POST',
            headers:{
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
            // body:qs.stringify(data),
            body:'name=hussein',
        }).then((response) => response.json())
            .then(function (response) {
                console.log('Register API response: ' + JSON.stringify(response))
                // console.log(response)
                if(response.value){
                    user = response.data;
                    saveUser(user)
                    return(dispatch(registerSuccess(user)))
                }
                else{
                    console.log('data error')
                    return(dispatch(registerFailure(response.msg)))
                } 
            })
            .catch(err => {
                console.log('Exception ERROR: ' + err)
                dispatch(registerFailure(err))
            })
        // axios.post('http://mahasel.feckrah.com/public/api/auth/register', qs.stringify(data))
        //     .then(function (response) {
        //         console.log('Register API response: ' + JSON.stringify(response.data))
        //         if(response.data.value){
        //             user = response.data.data;
        //             saveUser(user)
        //             return(dispatch(registerSuccess(user)))
        //         }
        //         else{
        //             return(dispatch(registerFailure(response.data.msg)))
        //         } 
        //     })
        //     .catch(err => dispatch(registerFailure(err)))
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
        deleteUser();
    }
}

async function deleteUser(){
    return await AsyncStorage.deleteItem('user').then((data)=>{
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
        data
    }
}

function logoutFailure(msg) {
    return {
        type: LOGOUT_FAILED,
        msg
    }
}