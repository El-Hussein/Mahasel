import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import localization from '../../localization/localization';
import BG from '../../assets/images/bg.png';

import Header from '../../components/Header';

class Settings extends Component{

  constructor(props) {
    super()
  }

  setData(data){
    return async () => {
      try {
        await AsyncStorage.setItem('language', JSON.stringify(data)).then(()=>{
          alert('inserted well')
        });
      } catch (error) {
        // Error saving data
      }
    }
  }

  render () {
    return (
        <ImageBackground source={BG} style={{width:wp('100%'), height:hp('100%')}}>
            {/* Header */}
            <Header />
            <View style={{marginHorizontal:wp('15%')}}>
              <View style={{backgroundColor:'#3FA9FD', padding:wp('1%'), alignSelf:'baseline', borderBottomRightRadius:wp('2%'), borderTopRightRadius:wp('2%'),}}>
                <Text style={{fontSize:wp('4.5%'), color:'white', fontWeight:'bold'}}> {localization.chooseLanguage} </Text>
              </View>
              <View style={{justifyContent:'space-between', width:wp('70%'), flexDirection:'row', alignItems:'center', marginTop:hp('2%')}}>
                  <TouchableOpacity disabled={true} onPress={()=>this.setData('ar')} style={{justifyContent:'center', alignItems:'center', width:wp('30%'), height:hp('5%'), backgroundColor:'white', borderRadius:wp('5%'), borderColor:'rgba(255,255,255,0.4)', borderWidth:wp('0.2%')}}>
                      <Text style={{fontSize:wp('4%'), color:'#2196F3'}}> {localization.arabic} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.setData('en')} style={{justifyContent:'center', alignItems:'center', width:wp('30%'), height:hp('5%'), backgroundColor:'#2196F3', borderRadius:wp('5%'), borderColor:'rgba(255,255,255,0.4)', borderWidth:wp('0.2%')}}>
                      <Text style={{fontSize:wp('4%'), color:'white'}}> {localization.english} </Text>
                  </TouchableOpacity>
              </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', marginVertical:hp('3%')}}>        
                <View style={{width:wp('80%'), height:hp('0.6%'), backgroundColor:'#3FA9FD'}}/>
            </View>  
            <View style={{marginHorizontal:wp('15%')}}>
              <View style={{backgroundColor:'#3FA9FD', padding:wp('1%'), alignSelf:'baseline', borderBottomRightRadius:wp('2%'), borderTopRightRadius:wp('2%'),}}>
                <Text style={{fontSize:wp('4.5%'), color:'white', fontWeight:'bold'}}> {localization.updatePhone} </Text>
              </View>
              <View style={{justifyContent:'space-between', width:wp('70%'), alignItems:'center', marginTop:hp('2%')}}>
                <View style={styles.inputBorder} >
                  <TextInput
                      style={styles.textInput}
                      placeholder={localization.registerPhone}
                      autoCorrect={false}
                      returnKeyType="next"
                      ref="password"
                      placeholderTextColor="#87CBFC"
                      underlineColorAndroid="transparent"
                  />
                  <Icon name="phone" size={wp('5%')} color="#87CBFC"/>
                </View>
              </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', marginVertical:hp('3%')}}>        
                <View style={{width:wp('80%'), height:hp('0.6%'), backgroundColor:'#3FA9FD'}}/>
            </View>  
            <View style={{marginHorizontal:wp('15%')}}>
              <View style={{backgroundColor:'#3FA9FD', padding:wp('1%'), alignSelf:'baseline', borderBottomRightRadius:wp('2%'), borderTopRightRadius:wp('2%'),}}>
                <Text style={{fontSize:wp('4.5%'), color:'white', fontWeight:'bold'}}> {localization.updatePassword} </Text>
              </View>
              <View style={{justifyContent:'space-between', width:wp('70%'), alignItems:'center', marginTop:hp('2%')}}>
                <View style={styles.inputBorder} >
                  <TextInput
                      style={styles.textInput}
                      placeholder={localization.updatePasswordOld}
                      autoCorrect={false}
                      returnKeyType="next"
                      ref="password"
                      placeholderTextColor="#87CBFC"
                      underlineColorAndroid="transparent"
                  />
                  <Icon name="lock" size={wp('5%')} color="#87CBFC"/>
                </View>
                <View style={styles.inputBorder} >
                  <TextInput
                      style={styles.textInput}
                      placeholder={localization.updatePasswordNew}
                      autoCorrect={false}
                      returnKeyType="next"
                      ref="password"
                      placeholderTextColor="#87CBFC"
                      underlineColorAndroid="transparent"
                  />
                  <Icon name="lock" size={wp('5%')} color="#87CBFC"/>
                </View>
                <View style={styles.inputBorder} >
                  <TextInput
                      style={styles.textInput}
                      placeholder={localization.updatePasswordConfirmNew}
                      autoCorrect={false}
                      returnKeyType="next"
                      ref="password"
                      placeholderTextColor="#87CBFC"
                      underlineColorAndroid="transparent"
                  />
                  <Icon name="lock" size={wp('5%')} color="#87CBFC"/>
                </View>
              </View>
            </View>
        </ImageBackground>
    )
  }
}

export default Settings;

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  inputBorder:{
      backgroundColor:'#D3E9FE', 
      flexDirection:'row', 
      justifyContent:'center', 
      alignItems:'center', 
      borderRadius:wp('4%'), 
      marginBottom:hp('1.5%'), 
      width:wp('65%'),
  },
  textInput:{
      width:wp('55%'), 
      padding:0, 
      height:hp('5.5%'), 
      paddingHorizontal:wp('2%'), 
      fontSize:wp('4%'), 
      fontWeight:'600', 
      color:'#87CBFC',
      textAlign:'center',
  },
  buttonText:{
      color:'white', 
      textAlign:'center', 
      fontSize:wp('5%'), 
      fontWeight:'bold'
  },
});