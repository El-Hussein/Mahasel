import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    I18nManager,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../actions/authinticationActions';

import localization from '../localization/localization';

import DrawerBG from '../assets/images/drawerBackground.png';
import home from '../assets/images/home.png';
import ProfileDefault from '../assets/images/default.jpg';
import profile from '../assets/images/profile.png';
import orders from '../assets/images/orders.png';
import settings from '../assets/images/settings.png';
import callus from '../assets/images/callus.png';
import terms from '../assets/images/terms.png';
import logoutImage from '../assets/images/logout.png';
import ButtonBG from '../assets/images/buttonBGSolid.png';


class ContentDrawerComponent extends Component{

    constructor(props) {
        super();
        this.state= {
            list:[
                {id:0,name:localization.home, icon:home, link:'Home'},
                // {id:2,name:localization.orders, icon:orders, link:'Orders'},
                {id:1,name:localization.callUs, icon:callus, link:'Call_Us'},
                {id:2,name:localization.termsConditions, icon:terms, link:'Conditions'},
                {id:3,name:localization.myAds, icon:callus, link:'myAds'},
                {id:4,name:localization.settings, icon:settings, link:'Profile'},
                {id:5,name:localization.exit, icon:logoutImage, link:'logout'},
            ],
            activePage:0,
            refresh:true,
        }
    }

    componentWillReceiveProps(){
        this.setState({ 
            refresh: this.props.auth.isLogingOut
        })
    }

    render () {
        user = this.props.auth.user;
        userToken = this.props.auth.userToken;
         return (
            <View>
                <Image source={DrawerBG}  style={[{height:hp('100%'), width:wp('100%'), backgroundColor:'red', position:'absolute', zIndex:-1}, I18nManager.isRTL? {left:0}:{right:0} ]}/>
                {userToken?
                    <View style={{height:hp('34.5%'), width:wp('85%'), justifyContent:'center', alignItems:'center'}}>
                        <Image source={{uri:user.image}} style={{width:wp('18%'), borderWidth:wp('0.8%'), borderColor:'white', height:wp('18%'), borderRadius:wp('9%'), backgroundColor:'red', marginBottom:wp('1%')}}/>
                        <Text style={{fontWeight:'bold', fontSize:wp('4.2%'), color:'white'}}> {user.name} </Text>
                        <Text style={{fontWeight:'bold', fontSize:wp('4.2%'), color:'#242424'}}> {user.phone} </Text>
                    </View>
                :
                    <View style={{height:hp('34.5%'), width:wp('85%'), justifyContent:'center', alignItems:'center'}}>
                        <Image source={ProfileDefault} style={{width:wp('18%'), borderWidth:wp('0.8%'), borderColor:'white', height:wp('18%'), borderRadius:wp('9%'), backgroundColor:'red', marginBottom:wp('1%')}}/>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>{
                                this.props.navigation.navigate('SignIn');
                            }} style={{justifyContent:'center', alignItems:'center', width:wp('30%'), height:hp('10%')}}>
                                <Image source={ButtonBG} style={{width:wp('30%'), height:hp('10%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                                <View>
                                {this.props.auth.isLoging?<View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><ActivityIndicator/><Text style={styles.buttonText}> {localization.signIn} </Text></View>:<Text style={styles.buttonText}> {localization.signIn} </Text>}
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                            <Text style={{fontWeight:'bold', fontSize:wp('4.2%'), color:'white'}}> {localization.newMember} </Text>
                        </TouchableOpacity>
                    </View>
                }
                
                <View style={{marginTop:hp('1.5%')}}>
                    <FlatList 
                    data={this.state.list}
                    extraData = {this.state}
                    renderItem={({item}) =>{
                        console.log('updated?')
                        if(item.id==this.state.activePage){
                            activeStyle=StyleSheet.create({
                                AC:{backgroundColor:'rgba(170,170,170,0.8)', borderTopWidth:wp('0.3%'), borderTopColor:'rgba(255,255,255,0.5)'}
                            });
                        }else{
                            activeStyle=StyleSheet.create({
                                AC:{}
                            });
                        }
                        if(!this.props.auth.userToken && item.id === 5){
                            console.log('shuold disappear')
                            return;
                        } 
                        return (
                        <TouchableOpacity disabled={item.active} onPress={()=>{
                            this.setState({
                                activePage:item.id
                            })
                            if(item.id === 5){
                                this.props.logout();
                                this.setState({ 
                                    refresh: this.props.auth.isLogingOut
                                })
                            }else {
                                this.props.navigation.navigate(item.link);
                            }
                        }} style={[{justifyContent:'center', flexDirection:'row', alignItems:'center', height:hp('7.5%'), width:wp('85%')}, activeStyle.AC]}>
                            {this.props.auth.isLogingOut && item.id==6?<ActivityIndicator style={{position:'absolute', left:0}}/>:null} 
                            <Text style={{fontWeight:'bold', fontSize:wp('4.5%'), color:'black', textAlign:'right', width:wp('70%')}}> {item.name} </Text>
                            <Image source={item.icon} style={{marginRight:wp('2%'), width:wp('5%'), resizeMode:'contain', height:wp('5%')}}/>
                        </TouchableOpacity>
                        )
                    }
                    }
                    keyExtractor={item => toString(item.id)}
                    />
                </View>

            </View>
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
        ...bindActionCreators({ logout }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentDrawerComponent)

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
        fontSize:wp('4%'), 
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