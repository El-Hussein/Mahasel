/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import configureStore from './configureReducer';
import HomeScreen from './src/test/HomeScreen';

const NavigationApp = StackNavigator({
    HomeScreen: { screen: HomeScreen }
})
  
const store = configureStore()
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
      <Provider store={store}>
          <NavigationApp />
      </Provider>
    );
  }
}



