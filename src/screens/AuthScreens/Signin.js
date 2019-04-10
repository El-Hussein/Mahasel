import React, {Component} from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    PixelRatio,
    ActivityIndicator
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import localization from '../../localization/localization';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../actions/authinticationActions';

import BG from '../../assets/images/bg1.png';
import Logo from '../../assets/images/logo.png';
import Call from '../../assets/images/phone.png';
import Lock from '../../assets/images/lock.png';
import ButtonBG from '../../assets/images/buttonBG.png';
import ButtonBGS from '../../assets/images/buttonBGSolid.png';
import Facebook from '../../assets/images/Facebook.png';
import Twitter from '../../assets/images/Twitter.png';

class Signin extends Component{
 
    constructor(props) {
        super()
        this.handleSignIN = this.handleSignIN.bind(this);
        this.state = {
            phone:'',
            password:'',
            phoneError:false,
            passwordErrophoneError:false,
        } 
        // console.log(props.auth)
        if(props.auth.userToken){
            // console.log('logged in successfully');
            props.navigation.navigate('Home');
        }
    }
    validate(){
        error = false;
        if(!this.state.password){
            this.setState({
                passwordError:true
            })
            error = true;
        }else{
            this.setState({
                passwordError:false
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
        return error;
    }
    handleSignIN(){
        if(this.validate()) return;
        data = {
            phone:this.state.phone,
            password:this.state.password,
        }
        this.props.login(data);  
    }

    render () {   
        // console.log(this.props.categories);
        // console.log(this.props.auth)
        if(this.props.auth.userToken != null){
            // this.refs.toast.show(localization.signed);
            this.props.navigation.navigate('Home');
        }
        return (
            <ImageBackground source={BG}  style={styles.pageBG}>
                {/* HEADER */}
                <Header title={localization.login} drawer='stop'/>
                
                <View style={{justifyContent:'center', alignItems:'center', padding:hp('2%')}}>
                    <Image source={Logo} style={styles.logo}/>
                </View>

                <View style={{marginHorizontal:wp('10%')}}>
                    {this.props.auth.error?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{this.props.auth.error}</Text>:null}
                    {this.state.phoneError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.phoneError}</Text>:null}
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.phoneNumber}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="phone"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(phone) => this.setState({phone})}
                        />
                        <Image source={Call} style={styles.image4_5}/>
                    </View>

                    {this.state.passwordError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.passwordError}</Text>:null}
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.password}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="password"
                            secureTextEntry={true}
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(password) => this.setState({password})}
                        />
                        <Image source={Lock} style={styles.image4_5}/>
                    </View>
                    <TouchableOpacity>
                        <Text style={{color:'#585858', textAlign:'left', fontSize:wp('3.5%'), fontWeight:'600'}}> {localization.forgetPassword} </Text>
                    </TouchableOpacity>

                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{
                            this.handleSignIN();
                        }} style={{justifyContent:'center', alignItems:'center', width:wp('35%'), height:hp('10%')}}>
                            <Image source={ButtonBG} style={{width:wp('35%'), height:hp('10%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                            {this.props.auth.isLoging?<View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><ActivityIndicator/><Text style={styles.buttonText}> {localization.signIn} </Text></View>:<Text style={styles.buttonText}> {localization.signIn} </Text>}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent:'space-between', marginBottom:hp('3%'), marginHorizontal:wp('3%'), flexDirection:'row'}}>
                        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:wp('35%'), height:hp('10%')}} onPress={()=>{this.props.navigation.navigate('Home')}}>
                            <Image source={ButtonBGS} style={{width:wp('35%'), height:hp('10%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                                <Text style={styles.buttonText}> {localization.skipLogin} </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:wp('35%'), height:hp('10%')}} onPress={()=>{this.props.navigation.navigate('Register')}}>
                            <Image source={ButtonBGS} style={{width:wp('35%'), height:hp('10%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                                <Text style={styles.buttonText}> {localization.newMember} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{justifyContent:'space-between', marginHorizontal:wp('25%'), flexDirection:'row'}}>
                        <TouchableOpacity>
                            <Image source={Twitter}  style={styles.social}/>
                        </TouchableOpacity>    
                        <TouchableOpacity>
                            <Image source={Facebook} style={styles.social} />
                        </TouchableOpacity>
                    </View>

                </View>

            </ImageBackground>
         )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ login }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
var FONT_BACK_LABEL   = 16;
if (PixelRatio.get() <= 2) {
    FONT_BACK_LABEL = 14;
}
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
        width:wp('50%'), 
        height:hp('20%'), 
        resizeMode:'contain'
        // backgroundColor:'red'
    },
    inputBorder:{
        backgroundColor:'white', 
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
        height:hp('5.5%'), 
        paddingHorizontal:wp('2%'), 
        fontSize:wp('4%'), 
        fontWeight:'600', 
        color:'#A3A3A3'
    },
    buttonText:{
        color:'white', 
        textAlign:'center', 
        fontSize:FONT_BACK_LABEL, 
        fontWeight:'300'
    },
    social:{
        width:wp('12%'), 
        height:wp('12%'), 
        resizeMode:'contain'
    },
    pageBG:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    }
});