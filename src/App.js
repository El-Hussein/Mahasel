import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import MainNav from './screensNavigatior/MainNav'



export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }
  render() {
    return (
      <MainNav/>
    );
  }
}


