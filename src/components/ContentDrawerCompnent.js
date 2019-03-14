import React, {Component} from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import DrawerBG from '../assets/images/drawerBackground.png';
import home from '../assets/images/home.png';
import ProfileDefault from '../assets/images/profile_pic.png';
import profile from '../assets/images/profile.png';
import orders from '../assets/images/orders.png';
import settings from '../assets/images/settings.png';
import callus from '../assets/images/callus.png';
import terms from '../assets/images/terms.png';
import logout from '../assets/images/logout.png';
import localization from '../localization/localization';

class Artboard3 extends Component{

    constructor(props) {
        super();
        this.state= {
            list:[
                {name:localization.home, icon:home, active:true, link:'Home'},
                {name:localization.profile, icon:profile, active:false, link:'Profile'},
                {name:localization.orders, icon:orders, active:false, link:'MyCart'},
                {name:localization.callUs, icon:callus, active:false, link:'Call_Us'},
                {name:localization.termsConditions, icon:terms, active:false, link:'Conditions'},
                {name:localization.settings, icon:settings, active:false, link:'Signin'},
                {name:localization.exit, icon:logout, active:false, link:'Exit'},
            ],
            userType:'customer',
        }
    }

    render () {
         return (
            <ImageBackground source={DrawerBG}  style={{height:hp('100%'), width:wp('100%'), backgroundColor:'red'}}>
            
                <View style={{height:hp('34.5%'), width:wp('85%'), justifyContent:'center', alignItems:'center'}}>
                    <Image source={ProfileDefault} style={{width:wp('18%'), borderWidth:wp('0.8%'), borderColor:'white', height:wp('18%'), borderRadius:wp('9%'), backgroundColor:'red', marginBottom:wp('1%')}}/>
                    <Text style={{fontWeight:'bold', fontSize:wp('4.2%'), color:'white'}}> محمد عبدالله إبراهيم </Text>
                    <Text style={{fontWeight:'bold', fontSize:wp('4.2%'), color:'#242424'}}> شارع الرياض في وسط المدينه </Text>
                </View>
                
                <View style={{marginTop:hp('1.5%')}}>
                    <FlatList 
                    data={this.state.list}
                    renderItem={({item}) =>{
                        if(item.active){
                            activeStyle=StyleSheet.create({
                                AC:{backgroundColor:'rgba(170,170,170,0.8)', borderTopWidth:wp('0.3%'), borderTopColor:'rgba(255,255,255,0.5)'}
                            });
                        }else{
                            activeStyle=StyleSheet.create({
                                AC:{}
                            });
                        }
                        return (
                        <TouchableOpacity disabled={item.active} onPress={()=>{
                            if(item.link === 'MyCart' && this.state.userType==='merchent'){
                                this.props.navigation.navigate('MerchentCart')
                            }else {
                                this.props.navigation.navigate(item.link)
                            }
                        }} style={[{justifyContent:'center', flexDirection:'row', alignItems:'center', height:hp('7.5%'), width:wp('85%')}, activeStyle.AC]}>
                            <Image source={item.icon} style={{marginRight:wp('2%'), width:wp('5%'), resizeMode:'contain', height:wp('5%')}}/>
                            <Text style={{fontWeight:'bold', fontSize:wp('4.5%'), color:'black', textAlign:'left', width:wp('70%')}}> {item.name} </Text>
                        </TouchableOpacity>
                        )
                    }
                    }
                    keyExtractor={item => toString(item.name)}
                    />
                </View>

            </ImageBackground>
         )
    }
}

export default Artboard3
