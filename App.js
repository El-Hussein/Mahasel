/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
// import Artboard1 from './app/pages/Artboard1';
// import Artboard2 from './app/pages/Artboard2';
// import Artboard3 from './app/pages/Artboard3';
// import Artboard4 from './app/pages/Artboard4';
// import Artboard5 from './app/pages/Artboard5';
// import Artboard6 from './app/pages/Artboard6';
// import Artboard7 from './app/pages/Artboard7';
// import Artboard8 from './app/pages/Artboard8';
// import Artboard9 from './app/pages/Artboard9';
// import Artboard10 from './app/pages/Artboard10';
// import Artboard11 from './app/pages/Artboard11';
// import Artboard12 from './app/pages/Artboard12';
// import Artboard13 from './app/pages/Artboard13';
// import Artboard14 from './app/pages/Artboard14';
// import SplashScreen1 from './app/pages/SplashScreen1';
// import SplashScreen2 from './app/pages/SplashScreen2';
// import SplashScreen3 from './app/pages/SplashScreen3';
// import SplashScreen4 from './app/pages/SplashScreen4';
// import SplashScreen5 from './app/pages/SplashScreen5';

import React, {Component} from 'react';

import MainNav from './src/screensNavigatior/MainNav';
import CallUsScreen from './src/components/CallUsScreen';
import FruitListScreen from './src/components/FruitListScreen';
import ListItemScreen from './src/components/ListItemScreen';
import LoginScreen from './src/components/LoginScreen';
import LogoutScreen from './src/components/LogoutScreen';
import MainScreen from './src/components/MainScreen';
import PersonalScreen from './src/components/PersonalScreen';
import RegisterScreen from './src/components/RegisterScreen';
import SettingScreen from './src/components/SettingScreen';
import TermsScreen from './src/components/TermsScreen';
export default class App extends Component {

  render() {
    return (
      <TermsScreen />
    );
  }
}
