import React, {Component} from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Header from '../../components/Header';

import BG from '../../assets/images/Artboard3/bg.png';
import Logo from '../../assets/images/Artboard3/logo.png';
import Name from '../../assets/images/Artboard3/profile.png';
import Email from '../../assets/images/Artboard3/email.png';
import Phone from '../../assets/images/Artboard3/phone.png';
import ButtonBG from '../../assets/images/Artboard3/ButtonBG.png';
import localization from '../../localization/localization';

class Artboard3 extends Component{

    constructor(props) {
         super()
    }

    render () {
         return (
            <ImageBackground source={BG}  style={styles.pageBG}>
                {/* HEADER */}
                <Header title={localization.callUs}/>
                
                <Image source={Logo} style={{position:'absolute', width:wp('100%'), height:hp('100%')}}/>

                <View style={{marginHorizontal:wp('10%'), marginTop:hp('24%')}}>
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.userName}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="username"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                        />
                        <Image source={Name} style={styles.image4_5}/>
                    </View>

                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.phone}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="username"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                        />
                        <Image source={Phone} style={styles.image4_5}/>
                    </View>

                    <View style={[styles.inputBorder, {alignItems: "flex-start"}]} >
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            style={[styles.textInput, {height:hp('25%'), textAlignVertical: 'top', paddingTop:wp("2%")}]}
                            placeholder={localization.messege}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="password"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                        />
                        <Image source={Email} style={[styles.image4_5, {marginTop:wp('2%')}]}/>
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:wp('38%'), height:hp('10%')}}>
                            <Image source={ButtonBG} style={{width:wp('38%'), height:hp('10%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                                <Text style={styles.buttonText}> {localization.send} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
        )
    }
}

export default Artboard3

const styles = StyleSheet.create({
    header:{
        height:hp('7%'),
        backgroundColor:"#A07532",
        justifyContent:'space-between',
        alignItems:'center',
        padding:wp('5%'),
        flexDirection:'row'
    },
    image4_5:{
        width:wp('4.5%'), 
        height:wp('4.5%'), 
        resizeMode:'contain'
    },
    rowCenter:{
        justifyContent:'center', 
        alignItems:'center', 
        flexDirection:'row'
    },
    textHeader:{
        color:'white', 
        fontSize:wp('4.5%'), 
        marginHorizontal:wp('3%'), 
        fontWeight:'bold'
    },
    image6_5:{
        width:wp('6.5%'), 
        height:wp('6.5%'), 
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