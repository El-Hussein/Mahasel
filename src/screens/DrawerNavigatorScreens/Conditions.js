import React, {Component} from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    AsyncStorage,
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
import Header from '../../components/Header';

import BG from '../../assets/images/Artboard4/bg.png';
import Logo from '../../assets/images/Artboard4/logo.png';
import ButtonBG from '../../assets/images/Artboard3/ButtonBG.png';

class Artboard4 extends Component{

    constructor(props) {
         super()
         this.setLang().then(()=>{
             console.warn('done');
         });
    }
    async setLang(){
        lang = 'ar';
        return await AsyncStorage.setItem('language', lang).then((data)=>{
            if(lang=='ar'){
                I18nManager.forceRTL(false);
            }else if(lang=='en'){
                I18nManager.forceRTL(true);
            }        
            console.log('language changed successfully: ' + data)
          // async storage should take strings not objects as a paramaters
        }).catch((error)=>{
          console.warn('ERROR SET: ' + error)
        });
    }

    render () {
         return (
            <ImageBackground source={BG}  style={styles.pageBG}>

                {/* HEADER */}
                <Header title="الشروط والأحكام"/>
                
                <View style={{justifyContent:'center', alignItems:'center', marginVertical:hp('1%')}}>
                    <Image source={Logo} style={{width:wp('25%'), height:hp('16%'), resizeMode:'contain'}}/>
                </View>

                <View style={{marginHorizontal:wp('10%')}}>

                    <View style={[styles.inputBorder, {height:hp('55%')}]} >
                        
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:wp('38%'), height:hp('10%')}}>
                            <Image source={ButtonBG} style={{width:wp('38%'), height:hp('10%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                                <Text style={styles.buttonText}> موافق </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
         )
    }
}

export default Artboard4

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
        borderWidth:wp('0.3%'), 
        borderRadius:wp('4%'), 
        borderColor:'#C8AF88', 
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