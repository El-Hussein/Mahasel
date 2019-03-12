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
export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
          <NavigationApp />
      </Provider>
    );
  }
}



