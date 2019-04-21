import React, {Component} from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions/authinticationActions'
import BG from '../../assets/images/Artboard4/bg.png';
import Logo from '../../assets/images/Artboard4/logo.png';
import ButtonBG from '../../assets/images/Artboard3/ButtonBG.png';
import localization from '../../localization/localization';

class Conditions extends Component{

    constructor(props) {
         super()
    }

    render () {
         return (
            <ImageBackground source={BG}  style={styles.pageBG}>

                {/* HEADER */}
                <Header title={localization.termsConditions}/>
                
                <View style={{justifyContent:'center', alignItems:'center', marginVertical:hp('1%')}}>
                    <Image source={Logo} style={{width:wp('25%'), height:hp('16%'), resizeMode:'contain'}}/>
                </View>

                <View style={{marginHorizontal:wp('10%')}}>

                    <Text style={[styles.inputBorder, {height:hp('55%')}]} >
                        {this.props.terms.terms}
                    </Text>

                    <View style={{justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:wp('38%'), height:hp('10%')}}>
                            <Image source={ButtonBG} style={{width:wp('38%'), height:hp('10%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                                <Text style={styles.buttonText}> {localization.agree} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
         )
    }
}

function mapStateToProps(state) {
    return {
        terms: state.terms
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({  }, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Conditions); 

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