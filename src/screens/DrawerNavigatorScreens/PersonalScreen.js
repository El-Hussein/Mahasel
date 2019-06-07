import React, { Component } from 'react'
import { View, ActivityIndicator, AsyncStorage, I18nManager, ScrollView ,Text, Image, Picker, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import PhotoUpload from 'react-native-photo-upload'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions/authinticationActions'
import Toast, {DURATION} from 'react-native-easy-toast'

import ImagePicker from 'react-native-image-picker'
import Header from '../../components/Header'
import localization from '../../localization/localization'
import {LocalStorage} from '../../localStorage/LocalStorage';
import Icon from 'react-native-vector-icons/FontAwesome';
import ED from '../../assets/images/editPhoto.png'
import cat from '../../assets/images/cat.png';
import LAN from '../../assets/images/country.png'
import EMAIL from '../../assets/images/email.png'
import PH from '../../assets/images/phone.png'
import ButtonBG from '../../assets/images/buttonBG.png'
import ProfileDefault from '../../assets/images/profile_pic.png';

import BG from '../../assets/images/bg.png';
// import Logo from '../../assets/images/registerLogo.png';
import Name from '../../assets/images/user.png';
import Email from '../../assets/images/email.png';
import Country from '../../assets/images/country.png';
import City from '../../assets/images/city.png';
import Phone from '../../assets/images/phone.png';
import Lock from '../../assets/images/lock.png';

class PersonalScreen extends Component {
       
    constructor(props) {
        super()
        user = props.auth.user;
        this.state = {
            username:user.name,
            email:user.email,
            phone:user.phone,
            country:user.country,
            city:user.city,
            address:user.address,
            password:user.password,
            passwordConfirm:user.passwordConfirm,
            photo:user.image,
            lang:LocalStorage.lang,
            ImageSource: null,
            data: null,
        }
        this.updateProfileHandle = this.updateProfileHandle.bind(this)
        // console.warn(user)
    }

    async setLang(lang){
        return await AsyncStorage.setItem('language', lang).then((data)=>{
            if(lang=='ar'){
                I18nManager.forceRTL(false);
            }else if(lang=='en'){
                I18nManager.forceRTL(true);
            }        
            console.log('language changed successfully: ' + data)
            this.refs.toast.show(localization.languageUpdated);
          // async storage should take strings not objects as a paramaters
        }).catch((error)=>{
          console.log('ERROR SET: ' + error)
        });
    }
    
    updateProfileHandle(){
            
            data = {
                name:this.state.username,
                email:this.state.email,
                phone:this.state.phone,
                password:this.state.password,
                country:this.state.country,
                adddress:this.state.adddress,
                city:this.state.city,
                token:this.props.auth.userToken
            }
            if(this.state.ImageSource){
                data['image'] = this.state.ImageSource.uri;
            }
            this.props.updateProfile(data);
            this.refs.toast.show(localization.updated);
        
    }

    
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
    
        if (response.didCancel) {
            console.log('User cancelled photo picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };
    
            this.setState({
    
            ImageSource: source,
            data: response.data
    
            });
        }
        });
    }

    render() {
        const { photo } = this.state
        return (
            <View style={{ flex: 1, backgroundColor:'white' }}>
                <Header title={localization.settings} backScreen="SignIn" />


                <Image source={BG} style={{width:wp('100%'), height:hp('100%'), zIndex:-1, position:'absolute'}}/>
                <ScrollView style={{height:hp('90%')}}>
                
                
                

                <View style={{marginHorizontal:wp('10%')}}>
                    <Text style={[{backgroundColor:'#B7E212', fontSize:wp('5%'), fontWeight:'bold', padding:wp('2%'), width:'auto', alignSelf:'flex-end', marginVertical:hp('2%')}, !I18nManager.isRTL?{borderTopLeftRadius: wp('2%'), borderBottomLeftRadius: wp('2%') }:{borderTopRightRadius: wp('2%'), borderBottomRightRadius: wp('2%') }]}> {localization.changeLang} </Text>
                    <View style={{backgroundColor:'#538805', marginBottom:hp('2%'), width:wp('80%'), justifyContent:'center', alignItems:'center', height:hp('6%'), borderRadius:wp('3.5%')}}>
                        <Icon name="arrow-down" color="white" size={wp('3%')} style={{position:'absolute', left:wp('3%')}}/>
                        <Picker
                        selectedValue={this.state.lang}
                        style={{color:'white', width:wp('50%'), marginRight:wp('0%')}}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({
                                lang:itemValue
                            })
                            this.setLang(itemValue).then(()=>{
                                console.warn('done');
                            })
                        }}>
                            <Picker.Item label={localization.language} value="0" />
                            <Picker.Item label={localization.arabic} value="ar" />
                            <Picker.Item label={localization.english} value="en" />
                        </Picker>
                        <Image source={cat} style={[styles.image4_5, {position:'absolute', right:wp('3%')}]}/>
                    </View>
                    


                    {this.props.auth.userToken?

                    <View>
                    <Text style={[{backgroundColor:'#B7E212', fontSize:wp('5%'), fontWeight:'bold', padding:wp('2%'), width:'auto', alignSelf:'flex-end', marginVertical:hp('2%')}, !I18nManager.isRTL?{borderTopLeftRadius: wp('2%'), borderBottomLeftRadius: wp('2%') }:{borderTopRightRadius: wp('2%'), borderBottomRightRadius: wp('2%') }]}> {localization.personalSettings} </Text>

                     {this.props.auth.error?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{this.props.auth.error}</Text>:null}
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.userName}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="username"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            value={this.state.username}
                            onChangeText={(username) => this.setState({username})}
                        />
                        <Image source={Name} style={styles.image4_5}/>
                    </View>

                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.email}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="email"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}
                        />
                        <Image source={Email} style={styles.image4_5}/>
                    </View>
                    
                    {/* <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.country}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="country"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            value={this.state.user}
                            onChangeText={(country) => this.setState({country})}
                        />
                        <Image source={Country} style={styles.image4_5}/>
                    </View>

                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.city}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="city"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            value={this.state.user}
                            onChangeText={(city) => this.setState({city})}
                        />
                        <Image source={City} style={styles.image4_5}/>
                    </View>

                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.address}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="address"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            value={this.state.user}
                            onChangeText={(address) => this.setState({address})}
                        />
                        <Image source={address} style={styles.image4_5}/>
                    </View> */}

                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.phoneNumber}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="phone"
                            keyboardType='numeric'
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            value={this.state.phone}
                            onChangeText={(phone) => this.setState({phone})}
                        />
                        <Image source={Phone} style={styles.image4_5}/>
                    </View>
                    
                    {/* image upload */}
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                            {photo ? <Image
                                source={!this.state.ImageSource?{uri:photo}:this.state.ImageSource}
                                style={{ width: wp('20%'), height: wp('20%'), marginBottom:hp('1%'), borderRadius:wp('2%'), borderWidth:wp('0.5%'), borderColor:'white' }}
                                /> : null}
                        </View>
                        <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={this.selectPhotoTapped.bind(this)}>
                            <View style={{ flexDirection: 'row', width: wp('30%'), height: hp('6%'), backgroundColor: '#538805', borderRadius: wp('3%'), marginVertical: hp('2%'), alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: wp('4%'), fontWeight: 'bold', marginRight: wp('2%') }}>
                                    {localization.addImage}
                                </Text>
                                <Icon name="image" size={wp('4%')} color="white" />
                            </View>
                    
                        </TouchableOpacity>
                    </View>  
                    
                    <Text style={[{backgroundColor:'#B7E212', fontSize:wp('5%'), fontWeight:'bold', padding:wp('2%'), width:'auto', alignSelf:'flex-end', marginVertical:hp('2%')}, !I18nManager.isRTL?{borderTopLeftRadius: wp('2%'), borderBottomLeftRadius: wp('2%') }:{borderTopRightRadius: wp('2%'), borderBottomRightRadius: wp('2%') }]}> {localization.updatePassword} </Text>
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.newPassword}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="password"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}
                        />
                        <Image source={Lock} style={styles.image4_5}/>
                    </View>
                    
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.confirmPassword}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="passwordConfirmation"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            value={this.state.passwordConfirm}
                            onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
                        />
                        <Image source={Lock} style={styles.image4_5}/>
                    </View>
                    

                    <View style={{justifyContent:'flex-start', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.updateProfileHandle()} style={{justifyContent:'center', alignItems:'center', width:wp('40%'), height:hp('7%')}}>
                            <Image source={ButtonBG} style={{width:wp('40%'), height:hp('7%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                            {this.props.auth.isUpdating?<View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><ActivityIndicator/><Text style={styles.buttonText}> {localization.update} </Text></View>:<Text style={styles.buttonText}> {localization.update} </Text>}
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>:
                        null
                    }
                </View>
                </ScrollView>

                 <Toast ref="toast"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image4_5: {
        width: wp('5.5%'),
        height: wp('5.5%'),
        resizeMode: 'contain',
    },
    inputBorder: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: wp('0.2%'),
        borderRadius: wp('4%'),
        borderColor: '#538805',
        marginBottom: hp('1.5%'),
        marginTop: hp('1.5%'),
        paddingHorizontal: wp('2%')
    },
    textInput: {
        width: wp('70%'),
        padding: 0,
        height: hp('5.8%'),
        paddingHorizontal: wp('2%'),
        fontSize: wp('4%'),
        fontWeight: '600',
        color: '#A3A3A3'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: wp('4.5%'),
        fontWeight: '600'
    },
});

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ updateProfile }, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonalScreen);