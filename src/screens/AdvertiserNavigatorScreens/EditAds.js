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

import BG from '../../assets/images/bg.png';
import BGM from '../../assets/images/bg1.png';
import cat1_image from '../../assets/images/product.jpg';
import plus from '../../assets/images/plus.png';
import minus from '../../assets/images/minus.png';
import del from '../../assets/images/del.png';

// const Slider = props => ( <View style={[styles.imageContainer, {alignItems:'center', justifyContent:'center', marginTop:10,}]}>
//         <Image style={{height:hp('14.8%'), width:wp('99%')}} source={props.uri} resizeMode="contain"/>
//     </View>
// )

class Cart extends Component{

  constructor(props) {
    super()
    this.state = {
      products: [
        {code:0, image:{src: cat1_image, width:2480, height:3508}, times:1, weight:"880 جرام", name:"نسكافيه فانيليا", price:10},
        {code:1, image:{src: cat1_image, width:2480, height:3508}, times:1, weight:"18.5 جرام 10 كيس", name:"نسكافيه فانيليا", price:20},
        {code:2, image:{src: cat1_image, width:2480, height:3508}, times:1, weight:"18.5 جرام 10 كيس", name:"نسكافيه فانيليا", price:30},
      ],
      orders: [
        {code:0, clientName:'حسين صلاح', clientAddress:'طوخ - حي الزهور'},
        {code:1, clientName:'حسين صلاح', clientAddress:'طوخ - حي الزهور'},
        {code:2, clientName:'حسين صلاح', clientAddress:'طوخ - حي الزهور'},
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


  render () {
      return (
        <ImageBackground source={BGM} style={{width:wp('100%'), height:hp('100%')}}>
            {/* Header */}
              <Header/>
              <View style={{backgroundColor:'#3FA9FD', flexDirection:'row', justifyContent:'flex-start', paddingHorizontal:wp('5%'), height:hp('4.5%'), alignItems:'center'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                  <Icon name={I18nManager.isRTL?'arrow-right':'arrow-left'} size={wp('5%')} color="white"/>
                </TouchableOpacity>
                <Text style={{color:'white', fontSize:wp('4.5%'), marginHorizontal:wp('1%')}}> {localization.newOrders} </Text>
                <Icon name="shopping-cart" size={wp('5%')} color="white"/>
              </View>

              
              <View style={{alignItems:'center', justifyContent:'center', marginTop:hp('2%')}}>
                <FlatList 
                data={this.state.orders}
                renderItem={({item}) =>{
                    return(

                      <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('COrder')
                        }}>
                        <View style={{flexDirection:'row', height:hp('10%'), justifyContent:'center', padding:wp('3%'), marginVertical:hp('1%'), backgroundColor:'white', width:wp('90%'), borderRadius:wp('1%'), borderWidth:wp('0.3%'), elevation:5, borderColor:'#A2D3FB', shadowOffset:{width:50, height:50}, shadowOpacity:0.8, shadowRadius:10, shadowColor:"red"}}>
                          <View style={{textAlign:'start', width:wp('45%')}}>
                              <View style={{flexDirection:'row'}}>
                                <Text style={{textAlign:'left', color:'#6BBAF5', width:wp('22%'), fontSize:wp('3.7%')}}>{localization.clientName}</Text>
                                <Text style={{textAlign:'left', color:'#6BBAF5', marginHorizontal:wp('1%'), fontWeight:'bold', fontSize:wp('4%')}}>:</Text>
                                <Text style={{textAlign:'left', color:'#4F4F4F', fontWeight:'bold', fontSize:wp('4%')}}>{item.clientName}</Text>
                              </View>
                              <View style={{flexDirection:'row'}}>
                                <Text style={{textAlign:'left', color:'#6BBAF5', width:wp('22%'), fontSize:wp('3.7%')}}>{localization.registerAddress}</Text>
                                <Text style={{textAlign:'left', color:'#6BBAF5', marginHorizontal:wp('1%'), fontWeight:'bold', fontSize:wp('4%')}}>:</Text>
                                <Text style={{textAlign:'left', color:'#4F4F4F', fontWeight:'bold', fontSize:wp('4%')}}>{item.clientAddress}</Text>
                              </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                    }
                }
                keyExtractor={item => toString(item.name)}
                style={{height:hp('80%')}}
                numColumns={1}
                /> 
            </View>
        </ImageBackground>
      )
  }
}

export default Cart;

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  header:{
    flex: 2.6,
    flexDirection:'row',
  },
  categories:{
    flex: 2,
    // backgroundColor:'blue',
  },
  slider:{
    flex: 4,
    backgroundColor:'grey',
    marginBottom:2,
    marginTop:1,
  },
  selected_products:{
    flex: 15,
    // backgroundColor:'green',
  },
  footer:{
    flex: 2.6,
    // backgroundColor:'brown',
  },


  header_image_bg:{
    flex: 1,
    resizeMode:'center',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    paddingLeft:4
  },
  logo :{
    width:'55%',
    height:'80%',

  },

  image_slider:{
    width: wp('99%'),
  },

  category:{
    margin:1,
    // padding:1,
    justifyContent:'center',
    alignItems:'center',
  },
  category_image: {
    width:35,
    height:35,
    marginVertical:2,
  },
  category_name:{
    fontWeight:"bold",
    fontSize:12,
    color: "white",
  },

  product:{
    width: wp('47.5%'),
    marginVertical:wp('0.8%'),
    marginHorizontal:wp('0.8%'),
    borderColor:"#03507E",
    borderWidth:wp('0.4%'),
    borderRadius:wp('2%'),
    padding:wp('1%'),
  },
  product_name:{
    textAlign: 'center',
    color:"#03507E",
    fontWeight:"600",
    fontSize:12,
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center',
    height:hp('5%')
  },
  product_price:{
    color:"#03507E",
    fontWeight:"bold",
    fontSize:18,
  },

  addToCart:{
    flexDirection:"row",
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#FE0000",
    borderRadius:5,
    borderWidth:1,
    borderColor:"#770101"
  },
}) 