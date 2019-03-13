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
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/Header';
import localization from '../../localization/localization';

import BG from '../../assets/images/bg.png';
import Logo from '../../assets/images/registerLogo.png';
import Name from '../../assets/images/user.png';
import Email from '../../assets/images/email.png';
import Country from '../../assets/images/country.png';
import City from '../../assets/images/city.png';
import Phone from '../../assets/images/phone.png';
import Lock from '../../assets/images/lock.png';
import ButtonBG from '../../assets/images/buttonBG.png';

class Artboard2 extends Component{

    constructor(props) {
         super()
    }
    render () {
         return (
            <ImageBackground source={BG}  style={styles.pageBG}>
                {/* HEADER */}
                <Header title={localization.signIn} backScreen="SignIn"/>
                
                
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image source={Logo} style={styles.logo}/>
                </View>

                <View style={{marginHorizontal:wp('10%')}}>
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
                            placeholder={localization.email}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="email"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                        />
                        <Image source={Email} style={styles.image4_5}/>
                    </View>
                    
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.country}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="country"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
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
                        />
                        <Image source={City} style={styles.image4_5}/>
                    </View>

                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.address}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="phone"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                        />
                        <Image source={Phone} style={styles.image4_5}/>
                    </View>

                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.phoneNumber}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="password"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                        />
                        <Image source={Lock} style={styles.image4_5}/>
                    </View>

                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.password}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="passwordConfirm"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                        />
                        <Image source={Lock} style={styles.image4_5}/>
                    </View>

                    <View style={{justifyContent:'flex-start', alignItems:'center'}}>
                        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:wp('40%'), height:hp('7%')}}>
                            <Image source={ButtonBG} style={{width:wp('40%'), height:hp('7%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                                <Text style={styles.buttonText}> {localization.next} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
         )
    }
}

export default Artboard2

const styles = StyleSheet.create({
    
    image4_5:{
        width:wp('4.5%'), 
        height:wp('4.5%'), 
        resizeMode:'contain'
    },
    logo:{
        width:wp('25%'), 
        height:hp('15%'), 
        margin:wp('3%'),
        resizeMode:'contain'
    },
    inputBorder:{
        backgroundColor:'rgba(255, 255, 255, 0.8)', 
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
        borderWidth:wp('0.2%'), 
        borderRadius:wp('4%'), 
        borderColor:'#538805', 
        marginBottom:hp('1.5%'), 
        paddingHorizontal:wp('2%')
    },
    textInput:{
        width:wp('70%'), 
        padding:0, 
        height:hp('5.8%'), 
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