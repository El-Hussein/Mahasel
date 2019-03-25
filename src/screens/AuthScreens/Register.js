import React, {Component} from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker'
import PhotoUpload from 'react-native-photo-upload'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import localization from '../../localization/localization';
import { register } from '../../actions/authinticationActions';

import BG from '../../assets/images/bg.png';
import Logo from '../../assets/images/registerLogo.png';
import Name from '../../assets/images/user.png';
import Email from '../../assets/images/email.png';
import Country from '../../assets/images/country.png';
import City from '../../assets/images/city.png';
import Phone from '../../assets/images/phone.png';
import Lock from '../../assets/images/lock.png';
import ButtonBG from '../../assets/images/buttonBG.png';
 
class Register extends Component{

    constructor(props) {
        super()
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            username:'',
            email:'',
            phone:'',
            country:'',
            city:'',
            address:'',
            password:'',
            passwordConfirm:'',
            photo:null,
            passwordConfirmError:null,
        }
        this.handleRegister = this.handleRegister.bind(this)
    }


    
    handleRegister(){
        if(this.state.password !== this.state.passwordConfirm){
            this.setState({
                passwordConfirmError:localization.confirmPasswordError
            })
        }else{
            this.setState({
                passwordConfirmError:null
            })
            
            data = {
                name:this.state.username,
                email:this.state.email,
                phone:this.state.phone,
                password:this.state.password,
                country:this.state.country,
                adddress:this.state.adddress,
                city:this.state.city,
                image:this.state.photo,
            }


            // console.warn(data);
            this.props.register(data);
            console.log('did it arrived?')
        }
    }

    
    

    render () {
        const { photo } = this.state
         return (
            <ImageBackground source={BG}  style={styles.pageBG}>
                {/* HEADER */}
                <Header title={localization.signIn} backScreen="SignIn"/>
                <ScrollView style={{height:hp('90%')}}>
                
                
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image source={Logo} style={styles.logo}/>
                </View>

                <View style={{marginHorizontal:wp('10%')}}>
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
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(phone) => this.setState({phone})}
                        />
                        <Image source={Phone} style={styles.image4_5}/>
                    </View>
                    
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.password}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="password"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
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
                            ref="passwordConfirm"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
                        />
                        <Image source={Lock} style={styles.image4_5}/>
                    </View>

                    {/* <View style={{justifyContent:'center', alignItems:'center'}}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: hp('0%') }}>
                            {photo ? <Image
                                source={{ uri: photo.uri }}
                                style={{ width: 100, height: 100 }}
                            /> : null}
                        </View>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', width: wp('30%'), height: hp('6%'), backgroundColor: '#538805', borderRadius: wp('3%'), marginVertical: hp('2%'), alignItems: 'center', justifyContent: 'center' }}
                            onPress={this.handleImagePicker}
                        >

                            <Text style={{ textAlign: 'center', color: 'white', fontSize: wp('4%'), fontWeight: 'bold', marginRight: wp('2%') }}>
                                {localization.addImage}
                            </Text>
                            <Icon name="image" size={wp('4%')} color="white" />
                        </TouchableOpacity>
                    </View> */}

                    {/* image upload */}
                    <View style={{justifyContent:'center', alignItems:'center'}} >
                        <PhotoUpload  
                        format="PNG"  
                        onPhotoSelect={avatar => {
                            if (avatar) {
                                this.setState({
                                    photo:avatar
                                })
                            console.log('Image base64 string: ', avatar)
                            }
                        }}
                        >
                            <View style={{ flexDirection: 'row', width: wp('30%'), height: hp('6%'), backgroundColor: '#538805', borderRadius: wp('3%'), marginVertical: hp('2%'), alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: wp('4%'), fontWeight: 'bold', marginRight: wp('2%') }}>
                                    {localization.addImage}
                                </Text>
                                <Icon name="image" size={wp('4%')} color="white" />
                            </View>
                        </PhotoUpload>
                        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                            {photo ? <Image
                                source={{ uri: 'data:image/png;base64,' + photo }}
                                style={{ width: wp('20%'), height: wp('20%'), marginBottom:hp('1%'), borderRadius:wp('10%'), borderWidth:wp('0.5%'), borderColor:'white' }}
                            /> : null}
                        </View>
                    </View>

                    <View style={{justifyContent:'flex-start', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.handleRegister()} style={{justifyContent:'center', alignItems:'center', width:wp('40%'), height:hp('7%')}}>
                            <Image source={ButtonBG} style={{width:wp('40%'), height:hp('7%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                            {this.props.auth.isRegistring?<View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><ActivityIndicator/><Text style={styles.buttonText}> {localization.register} </Text></View>:<Text style={styles.buttonText}> {localization.register} </Text>}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </ImageBackground>
         )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ register }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

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