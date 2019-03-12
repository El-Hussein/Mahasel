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

// import BG from '../../Imag/Artboard3/BG.png';
// import Logo from '../../Imag/Artboard3/Logo.png';
// import Name from '../../Imag/Artboard2/Name.png';
// import Email from '../../Imag/Artboard2/Email.png';
// import Phone from '../../Imag/Artboard2/Phone.png';
// import ButtonBG from '../../Imag/Artboard1/ButtonBG.png';

class Artboard3 extends Component{

    constructor(props) {
         super()
    }

    render () {
         return (
            <ImageBackground source={BG}  style={styles.pageBG}>
                {/* HEADER */}
                <Header title="أتصل بنا" backScreen="Home" drawer={true}/>
                
                

                <View style={{marginHorizontal:wp('10%')}}>
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder="الاسم"
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="username"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                        />
                        {/* <Image source={Name} style={styles.image4_5}/> */}
                    </View>

                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder="رقم الهاتف"
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="username"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                        />
                        {/* <Image source={Phone} style={styles.image4_5}/> */}
                    </View>

                    <View style={[styles.inputBorder, {alignItems: "flex-start"}]} >
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            style={[styles.textInput, {height:hp('25%'), textAlignVertical: 'top', paddingTop:wp("2%")}]}
                            placeholder="الرساله"
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="password"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                        />
                        {/* <Image source={Email} style={[styles.image4_5, {marginTop:wp('2%')}]}/> */}
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:wp('30%'), height:hp('10%')}}>
                            <Image source={ButtonBG} style={{width:wp('30%'), height:hp('10%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                                <Text style={styles.buttonText}> ارسال </Text>
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