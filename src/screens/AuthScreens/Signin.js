import React, {Component} from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    I18nManager
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/Header';

import BG from '../../assets/images/bg.png';

class Signin extends Component{

    constructor(props) {
         super()
    }
    render () {
         return (
            <View>
                <Image source={BG}  style={{width:wp('100'), height:hp('75%'), zIndex:-1, position:'absolute' }}/>
                {/* HEADER */}
                <Header/>
                
                
                <View style={{backgroundColor:'#3FA9FD', flexDirection:'row', justifyContent:'flex-start', paddingHorizontal:wp('5%'), height:hp('4.5%'), alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                    <Icon name={I18nManager.isRTL?'arrow-right':'arrow-left'} size={wp('5%')} color="white"/>
                    </TouchableOpacity>
                    <Text style={{color:'white', fontSize:wp('4.5%'), marginHorizontal:wp('1%')}}> {localization.Signin} </Text>
                </View>

                <View style={{marginHorizontal:wp('18%')}}>

                    <View style={{justifyContent:'center', alignItems:'center', marginVertical:hp('10%')}}>        
                        <View style={{width:wp('80%'), height:hp('0.6%'), backgroundColor:'#3FA9FD'}}/>
                    </View>        

                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.registerPhone}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="phone"
                            placeholderTextColor="#87CBFC"
                            underlineColorAndroid="transparent"
                        />
                        <Icon name="phone" size={wp('5%')} color="#87CBFC"/>
                    </View>

                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.registerPassword}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="password"
                            placeholderTextColor="#87CBFC"
                            underlineColorAndroid="transparent"
                        />
                        <Icon name="lock" size={wp('5%')} color="#87CBFC"/>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:wp('1%'), alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                            <Text style={{color:'white', fontSize:wp('4%')}}>{localization.registerNew}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{color:'white', fontSize:wp('4%')}}>{localization.forgetPassword}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center', marginTop:hp('2%')}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signin')} style={{justifyContent:'center', alignItems:'center', width:wp('30%'), height:hp('5%'), backgroundColor:'#2196F3', borderRadius:wp('5%'), borderColor:'rgba(255,255,255,0.4)', borderWidth:wp('0.2%')}}>
                            <Text style={styles.buttonText}> {localization.login} </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center', marginVertical:hp('3%')}}>        
                        <View style={{width:wp('80%'), height:hp('0.6%'), backgroundColor:'#3FA9FD'}}/>
                    </View>        
                </View>

            </View>
         )
    }
}

export default Signin

const styles = StyleSheet.create({
    inputBorder:{
        backgroundColor:'#D3E9FE', 
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:wp('4%'), 
        marginBottom:hp('1.5%'), 
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