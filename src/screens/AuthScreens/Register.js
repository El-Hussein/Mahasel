import React, {Component} from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    I18nManager,
    Picker,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhotoUpload from 'react-native-photo-upload'

import Header from '../../components/Header';

import BG from '../../assets/images/bg.png';
import BGM from '../../assets/images/bg1.png';

class Register extends Component{

    constructor(props) {
        super()    

        this.state={
            userType:'customer',
        }
    }
    render () {
        if(this.state.userType==='customer'){
        return (
            <View style={{backgroundColor:'white'}}>
                <Image source={BG}  style={{width:wp('100'), height:hp('75%'), zIndex:-1, position:'absolute' }}/>
                {/* HEADER */}
                <Header/>
                
                
                <View style={{backgroundColor:'#3FA9FD', flexDirection:'row', justifyContent:'flex-start', paddingHorizontal:wp('5%'), height:hp('4.5%'), alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                    <Icon name={I18nManager.isRTL?'arrow-right':'arrow-left'} size={wp('5%')} color="white"/>
                    </TouchableOpacity>
                    <Text style={{color:'white', fontSize:wp('4.5%'), marginHorizontal:wp('1%')}}> {localization.RegisterClient} </Text>
                </View>

                <View style={{margin:wp('18%')}}>
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.registerUsername}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="username"
                            placeholderTextColor="#87CBFC"
                            underlineColorAndroid="transparent"
                        />
                        <Icon name="user" size={wp('5%')} color="#87CBFC"/>
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

                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.registerReEnterPassword}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="password-confirmation"
                            placeholderTextColor="#87CBFC"
                            underlineColorAndroid="transparent"
                        />
                        <Icon name="lock" size={wp('5%')} color="#87CBFC"/>
                    </View>

                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.registerAddress}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="address"
                            placeholderTextColor="#87CBFC"
                            underlineColorAndroid="transparent"
                        />
                        <Icon name="globe" size={wp('5%')} color="#87CBFC"/>
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center', marginTop:hp('15%')}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signin')} style={{justifyContent:'center', alignItems:'center', width:wp('30%'), height:hp('5%'), backgroundColor:'#2196F3', borderRadius:wp('5%'), borderColor:'rgba(255,255,255,0.4)', borderWidth:wp('0.2%')}}>
                            <Text style={styles.buttonText}> {localization.signup} </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
        }else if(this.state.userType==='merchent'){
            return (
                <View style={{backgroundColor:'white'}}>
                    <Image source={BGM}  style={{width:wp('100'), height:hp('75%'), zIndex:-1, position:'absolute' }}/>
                    {/* HEADER */}
                    <Header/>
                    
                    
                    <View style={{backgroundColor:'#3FA9FD', flexDirection:'row', justifyContent:'flex-start', paddingHorizontal:wp('5%'), height:hp('4.5%'), alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <Icon name={I18nManager.isRTL?'arrow-right':'arrow-left'} size={wp('5%')} color="white"/>
                        </TouchableOpacity>
                        <Text style={{color:'white', fontSize:wp('4.5%'), marginHorizontal:wp('1%')}}> {localization.RegisterMerchent} </Text>
                    </View>
    
                    <View style={{margin:wp('18%')}}>
                        <View style={styles.inputBorderMerchent} >
                            <TextInput
                                style={styles.textInputMerchent}
                                placeholder={localization.registerMerchentname}
                                autoCorrect={false}
                                returnKeyType="next"
                                ref="username"
                                placeholderTextColor="#87CBFC"
                                underlineColorAndroid="transparent"
                            />
                            <Icon name="user" size={wp('5%')} color="#87CBFC"/>
                        </View>
    
                        {/* image upload */}
                        <View style={[styles.inputBorderMerchent, {backgroundColor:'#3FA9FD'}]} >
                            <PhotoUpload    
                            onPhotoSelect={avatar => {
                                if (avatar) {
                                console.log('Image base64 string: ', avatar)
                                }
                            }}
                            >
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Text style={[styles.textInput, {textAlignVertical:'center', color:'white'}]}> {localization.registerMerchentPhoto} </Text>
                                <Icon name="camera" size={wp('5%')} color="white"/>
                            </View>
                            </PhotoUpload>
                        </View>

                        <View style={styles.inputBorderMerchent} >
                            <TextInput
                                style={styles.textInputMerchent}
                                placeholder={localization.registerWorkingHours}
                                autoCorrect={false}
                                returnKeyType="next"
                                ref="WorkingHours"
                                placeholderTextColor="#87CBFC"
                                underlineColorAndroid="transparent"
                            />
                            <Icon name="alarm-clock" size={wp('5%')} color="#87CBFC"/>
                        </View>

                        <View style={styles.inputBorderMerchent} >
                            <TextInput
                                style={styles.textInputMerchent}
                                placeholder={localization.registerPhone}
                                autoCorrect={false}
                                returnKeyType="next"
                                ref="phone"
                                placeholderTextColor="#87CBFC"
                                underlineColorAndroid="transparent"
                            />
                            <Icon name="phone" size={wp('5%')} color="#87CBFC"/>
                        </View>
    
                        <View style={styles.inputBorderMerchent} >
                            <TextInput
                                style={styles.textInputMerchent}
                                placeholder={localization.registerPassword}
                                autoCorrect={false}
                                returnKeyType="next"
                                ref="password"
                                placeholderTextColor="#87CBFC"
                                underlineColorAndroid="transparent"
                            />
                            <Icon name="lock" size={wp('5%')} color="#87CBFC"/>
                        </View>
    
                        <View style={styles.inputBorderMerchent} >
                            <TextInput
                                style={styles.textInputMerchent}
                                placeholder={localization.registerReEnterPassword}
                                autoCorrect={false}
                                returnKeyType="next"
                                ref="password-confirmation"
                                placeholderTextColor="#87CBFC"
                                underlineColorAndroid="transparent"
                            />
                            <Icon name="lock" size={wp('5%')} color="#87CBFC"/>
                        </View>
    
                        <View style={styles.inputBorderMerchent} >
                            <TextInput
                                style={styles.textInputMerchent}
                                placeholder={localization.registerAddress}
                                autoCorrect={false}
                                returnKeyType="next"
                                ref="address"
                                placeholderTextColor="#87CBFC"
                                underlineColorAndroid="transparent"
                            />
                            <Icon name="globe" size={wp('5%')} color="#87CBFC"/>
                        </View>
    
                        <View style={{justifyContent:'center', alignItems:'center', marginTop:hp('4%')}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signin')} style={{justifyContent:'center', alignItems:'center', alignSelf:'auto', height:hp('5%'), backgroundColor:'#2196F3', borderRadius:wp('5%'), borderColor:'rgba(255,255,255,0.4)', borderWidth:wp('0.2%'), paddingHorizontal:wp('2%')}}>
                                <Text style={styles.buttonText}> {localization.agreeToConds} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
    
                </View>
            )
            }
    }
}

export default Register

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
    inputBorderMerchent:{
        backgroundColor:'#EAF4FD', 
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:wp('4%'), 
        marginBottom:hp('1.5%'), 
    },
    textInputMerchent:{
        width:wp('55%'), 
        padding:0, 
        height:hp('5%'), 
        paddingHorizontal:wp('2%'), 
        fontSize:wp('4%'), 
        fontWeight:'600', 
        color:'#87CBFC',
        textAlign:'center',
    },
    buttonText:{
        color:'white', 
        textAlign:'center', 
        fontSize:wp('4.5%'), 
        fontWeight:'600'
    },
});