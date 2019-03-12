import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  I18nManager,  
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import localization from '../../localization/localization';
import Header from '../../components/Header';
import MapView from 'react-native-maps';

import BG from '../../assets/images/bg.png';
import BGM from '../../assets/images/bg1.png';
import cat1_image from '../../assets/images/product.jpg';
import cat2_image from '../../assets/images/can.jpeg';
import cat3_image from '../../assets/images/joh.png';
import cat4_image from '../../assets/images/van.jpeg';
import plus from '../../assets/images/plus.png';
import minus from '../../assets/images/minus.png';
import del from '../../assets/images/del.png';

// const Slider = props => ( <View style={[styles.imageContainer, {alignItems:'center', justifyContent:'center', marginTop:10,}]}>
//         <Image style={{height:hp('14.8%'), width:wp('99%')}} source={props.uri} resizeMode="contain"/>
//     </View>
// )

class ClientOrders extends Component{

  constructor(props) {
    super()
    this.state = {
      products: [
        {code:0, image:{src: cat1_image, width:2480, height:3508}, quantity:4, name:"شيبسي", price:10},
        {code:1, image:{src: cat2_image, width:2480, height:3508}, quantity:3, name:"بيبسي", price:20},
        {code:2, image:{src: cat3_image, width:2480, height:3508}, quantity:4, name:"ليز", price:30},
        {code:2, image:{src: cat4_image, width:2480, height:3508}, quantity:2, name:"حليب", price:30},
      ],
      userType:'customer',
    }
  }
  
  componentDidMount() {
    lor(this);
  }

  componentWillUnMount() {
      rol();
  }

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  
  onRegionChange(region) {
    this.setState({ region });
  }

  render () {
      return (
        <ImageBackground source={BGM} style={{width:wp('100%'), height:hp('100%')}}>
            {/* Header */}
              <Header/>
              <View style={{backgroundColor:'#3FA9FD', flexDirection:'row', justifyContent:'flex-start', paddingHorizontal:wp('5%'), height:hp('4.5%'), alignItems:'center'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                  <Icon name={I18nManager.isRTL?'arrow-right':'arrow-left'} size={wp('5%')} color="white"/>
                </TouchableOpacity>
                <Text style={{color:'white', fontSize:wp('4.5%'), marginHorizontal:wp('1%')}}>         </Text>
                <Icon name="shopping-cart" size={wp('5%')} color="white"/>
              </View>

              <View style={{backgroundColor:'#2196F3', width:wp('80%'), marginHorizontal:wp('10%'), marginTop:hp('1%'), borderRadius:wp('5%'), height:hp('6%'), alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Text style={{textAlign:'left', color:'white', fontWeight:'bold', width:wp('30%'), textAlign:'center', fontSize:wp('5%'), paddingRight:wp('1%')}}>{localization.clientName}</Text>
                <Text style={{textAlign:'left', color:'white', fontWeight:'bold', width:wp('30%'), textAlign:'center', fontSize:wp('5%')}}>حسين صلاح</Text>        
              </View>
              
              <View style={{alignItems:'center', justifyContent:'center', marginTop:hp('2%')}}>
                <FlatList 
                data={this.state.products}
                renderItem={({item}) =>{
                    return(
                      <View style={{flexDirection:'row', width:wp('80'), height:hp('7%'), backgroundColor:'white', marginVertical:wp('0.5%'), borderRadius:wp('5%'), justifyContent:'center', alignItems:'center'}}>
                        <Image source={item.image.src} style={{width:wp('10%'), height:wp('10%'), resizeMode:'contain'}}/>
                        <Text style={{textAlign:'left', color:'#2196F3', fontWeight:'bold', width:wp('35%'), fontSize:wp('4%'), paddingRight:wp('1%')}}>{item.name}</Text>
                        <Text style={{textAlign:'left', color:'black', fontWeight:'bold', width:wp('10%'), fontSize:wp('4%')}}>{item.quantity}</Text>
                        <Text style={{textAlign:'left', color:'black', fontWeight:'bold', width:wp('5%'), fontSize:wp('4%')}}>{item.price}</Text>
                        <Text style={{textAlign:'left', color:'black', fontWeight:'bold', width:wp('15%'), fontSize:wp('4%')}}>ريال</Text>
                      </View>
                    )
                  }
                }
                keyExtractor={item => toString(item.name)}
                style={{height:hp('32%')}}
                numColumns={1}
                /> 
              </View>
              <View style={{backgroundColor:'white', width:wp('80%'), marginHorizontal:wp('10%'), marginTop:hp('1%'), borderRadius:wp('5%'), height:hp('6%'), alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Text style={{textAlign:'left', color:'#514947', fontWeight:'bold', width:wp('30%'), textAlign:'center', fontSize:wp('5%'), paddingRight:wp('1%')}}>{localization.total}</Text>
                <Text style={{textAlign:'left', color:'#514947', fontWeight:'bold', width:wp('30%'), textAlign:'center', fontSize:wp('5%')}}>25</Text>        
              </View>
              
              <View style={styles.container}>
                <MapView
                  region={this.state.region}
                  onRegionChange={this.onRegionChange}
                  style={styles.map}
                />
              </View>

              <View style={{flexDirection:'row', marginHorizontal:wp('10%'), justifyContent:'space-between', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ClientsOrdersFinal')}} style={{backgroundColor:'#2196F3', width:wp('25%'), alignSelf:'auto', padding:wp('2%'), borderRadius:wp('3%'), justifyContent:'center', alignItems:'center'}}>
                  <Text style={{color:'white', fontSize:wp('4%'), fontWeight:'bold'}}> {localization.accept} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'#2196F3', width:wp('25%'), alignSelf:'auto', padding:wp('2%'), borderRadius:wp('3%'), justifyContent:'center', alignItems:'center'}}>
                  <Text style={{color:'white', fontSize:wp('4%'), fontWeight:'bold'}}> {localization.call} </Text>
                </TouchableOpacity>
              </View>
        </ImageBackground>
      )
  }
}

export default ClientOrders;

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: hp('15%'),
    width: wp('80%'),
    marginHorizontal:wp('10%'),
    marginVertical:hp('1%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
}) 