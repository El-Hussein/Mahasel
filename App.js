/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { I18nManager, AsyncStorage } from 'react-native';
import localization from './src/localization/localization';
import RootNavigator from './src/navigators/RootNavigator';
import Splash from './src/screens/Splash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCategories } from './src/actions/categoryActions';
import { fetchCountries } from './src/actions/locationActions';
import { loginPass, loginPassToken } from './src/actions/authinticationActions';
import {LocalStorage} from './src/localStorage/LocalStorage';

import HomeScreen from './src/test/HomeScreen';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      rootPage: <Splash />,
      language:'ar',
      user:null,
    }
    setTimeout(
      ()=>{
        this.setState({
          rootPage: <RootNavigator />
        });
      },5000
    )
    this.checkUser = this.checkUser.bind(this);
    new LocalStorage().getLang();
    
  }
  
  componentWillMount(){
    this.checkLang();
    this.checkUser();
    this.props.fetchCategories();
    this.props.fetchCountries();
  }

  
  async checkLang(){
    return await AsyncStorage.getItem('language').then((data)=>{
      if(data){
        // console.log('lang'+data)
        // update state and use JSON.parse to convert string to object
        localization.setLanguage(data);
        if(data=='ar'){
          I18nManager.forceRTL(false);
        }else if(data=='en'){
          I18nManager.forceRTL(true);
        }
      }
      else {
        localization.setLanguage('en');
        if(data=='en'){
          I18nManager.forceRTL(true);
        }
        return null;
      }
    }).catch((error)=>{
      // console.log('ERROR GET Lang: ' + error)
    });
  }

  async checkUser(){
    return await AsyncStorage.getItem('user').then(data=>JSON.parse(data)).then(async(data)=>{
      if(data){
        // update state and use JSON.parse to convert string to object
        // console.log(data)
        accesToken = await AsyncStorage.getItem('userToken').then((response)=>JSON.parse(response));
        this.props.loginPass(data);
        this.props.loginPassToken(accesToken);
        // console.log(accesToken)
        this.setState({
          rootPage: <RootNavigator />
        });
      }
      else {
        // console.log('ERROR: not found')
        return null;
      }
    }).catch((error)=>{
      // console.log('ERROR GET: ' + error)
    });
  }

  render() {
    return (
      this.state.rootPage  
      // <HomeScreen /> 
    );
  }
}

function mapStateToProps(state) {
  return {
      ads: state.ads,
      auth: state.auth,
      categories: state.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
      ...bindActionCreators({ fetchCategories, loginPass, fetchCountries, loginPassToken }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
