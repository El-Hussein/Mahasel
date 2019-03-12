import React, {Component} from 'react'
import {
    ImageBackground,
    Text,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import Splash from '../assets/images/splash.png';

class SplashScreen1 extends Component{

    constructor(props) {
         super()
    }
    render () {
         return (
            <ImageBackground source={Splash}  style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
              }}>
            </ImageBackground>
         )
    }
}

export default SplashScreen1