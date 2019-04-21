import React, {Component} from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import Toast from 'react-native-easy-toast'

import BG from '../../assets/images/Artboard3/bg.png';
import Logo from '../../assets/images/Artboard3/logo.png';
import Name from '../../assets/images/Artboard3/profile.png';
import Email from '../../assets/images/Artboard3/email.png';
import Phone from '../../assets/images/Artboard3/phone.png';
import ButtonBG from '../../assets/images/Artboard3/ButtonBG.png';
import localization from '../../localization/localization';
import { LocalStorage } from '../../localStorage/LocalStorage';

class Artboard3 extends Component{

    constructor(props) {
        super()
        this.state = {
            username:'',
            usernameError:false,
            phone:'',
            phoneError:false,
            message:'',
            messegeError:false,
            sending : false,
        }
        this._sendMessage = this._sendMessage.bind(this);
    }

    validate(){
        error = false;
        if(!this.state.username){
            this.setState({
                usernameError:true
            })
            error = true;
        }else{
            this.setState({
                usernameError:false
            })
        }
        if(!this.state.phone){
            this.setState({
                phoneError:true
            })
            error = true;
        }else{
            this.setState({
                phoneError:false
            })
        }
        if(!this.state.message){
            this.setState({
                messegeError:true
            })
            error = true;
        }else{
            this.setState({
                messegeError:false
            })
        }
        // console.warn(error)
        return error;
    }

    clearForm(){
        this.setState({
            username:null,
            phone:null,
            message:null,
        })
    }

    _sendMessage(){
        if(this.validate()) return;
        this.setState({
            sending:true,
        })
        // console.warn('test');
        formData = new FormData();
        formData.append('name', this.state.username)
        formData.append('email', this.state.phone)
        formData.append('message', this.state.message)
        fetch( 'http://mahasel.feckrah.com/public/api/contact', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'X-localization' : LocalStorage.lang
            },
            body: formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // Perform success response.
            // console.warn('respones' + JSON.stringify(responseJson));
            if(responseJson.value){
                this.refs.toast.show(localization.sent);
                this.clearForm()
            }
            else{
                this.refs.toast.show(localization.errorSent);
            } 
        })
        .catch((error) => {
            // console.warn('error: ' + error)
        });
        this.setState({
            sending:false,
        })
    }

    render () {
         return (
            <ImageBackground source={BG}  style={styles.pageBG}>
                {/* HEADER */}
                <Header title={localization.callUs}/>
                
                <Image source={Logo} style={{position:'absolute', width:wp('100%'), height:hp('100%')}}/>
                <ScrollView>
                <View style={{marginHorizontal:wp('10%'), marginTop:hp('24%')}}>
                    {this.state.usernameError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.usernameError}</Text>:null}
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
                    {this.state.phoneError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.phoneError}</Text>:null}
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.phone}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="phone"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            value={this.state.phone}
                            onChangeText={(phone) => this.setState({phone})}
                        />
                        <Image source={Phone} style={styles.image4_5}/>
                    </View>
                    {this.state.messegeError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.messegeError}</Text>:null}
                    <View style={[styles.inputBorder, {alignItems: "flex-start"}]} >
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            style={[styles.textInput, {height:hp('25%'), textAlignVertical: 'top', paddingTop:wp("2%")}]}
                            placeholder={localization.messege}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="message"
                            value={this.state.message}
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(message) => this.setState({message})}
                        />
                        <Image source={Email} style={[styles.image4_5, {marginTop:wp('2%')}]}/>
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this._sendMessage()} style={{justifyContent:'center', alignItems:'center', width:wp('38%'), height:hp('10%')}}>
                            <Image source={ButtonBG} style={{width:wp('38%'), height:hp('10%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                                {this.state.sending?<View style={{flexDirection:'row'}}><ActivityIndicator/><Text style={styles.buttonText}> {localization.send} </Text></View>:<Text style={styles.buttonText}> {localization.send} </Text>} 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
                <Toast ref="toast"/>
            </ImageBackground>
        )
    }
}

export default Artboard3

const styles = StyleSheet.create({
    image4_5:{
        width:wp('4.5%'), 
        height:wp('4.5%'), 
        resizeMode:'contain'
    },
    logo:{
        width:wp('25%'), 
        height:hp('17%'), 
        margin:wp('5%')
    },
    inputBorder:{
        backgroundColor: 'rgba(255, 255, 255, 0.75)', 
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
        borderWidth:wp('0.2%'), 
        borderRadius:wp('4%'), 
        borderColor:'green', 
        marginBottom:hp('1%'), 
        paddingHorizontal:wp('2%')
    },
    textInput:{
        width:wp('70%'), 
        padding:0, 
        height:hp('5.5%'), 
        paddingHorizontal:wp('2%'), 
        fontSize:wp('4%'), 
        fontWeight:'600', 
        color:'#A3A3A3'
    },
    buttonText:{
        color:'white', 
        textAlign:'center', 
        fontSize:wp('4.5%'), 
        fontWeight:'600'
    },
    pageBG:{
        flex: 1,
        resizeMode: 'stretch',
    }
});