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
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import localization from '../../localization/localization';
import Header from '../../components/Header';

import cat1_image from '../../assets/images/product.jpg';
import plus from '../../assets/images/plus.png';
import minus from '../../assets/images/minus.png';

// const Slider = props => ( <View style={[styles.imageContainer, {alignItems:'center', justifyContent:'center', marginTop:10,}]}>
//         <Image style={{height:hp('14.8%'), width:wp('99%')}} source={props.uri} resizeMode="contain"/>
//     </View>
// )

class Cart extends Component{

  constructor(props) {
    super()
    this.state = {
      products: [
        {code:0, image:{src: cat1_image, width:2480, height:3508}, times:1, specs:"18.5 جرام 10 كيس", name:"نسكافيه فانيليا", price:4898},
        {code:1, image:{src: cat1_image, width:2480, height:3508}, times:1, specs:"18.5 جرام 10 كيس", name:"نسكافيه فانيليا", price:2299},
        {code:2, image:{src: cat1_image, width:2480, height:3508}, times:1, specs:"18.5 جرام 10 كيس", name:"نسكافيه فانيليا", price:5999},
      ],
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
        <View style={{flex:1}}>
            {/* Header */}
            <Header/>
            <Text> {localization.cart} </Text>
              <View style={{alignItems:'center', justifyContent:'center', marginTop:hp('2%')}}>
                <FlatList 
                data={this.state.products}
                renderItem={({item}) =>{
                    return(

                      <View style={{flexDirection:'row', justifyContent:'space-between', padding:wp('3%'), marginVertical:hp('1%'), backgroundColor:'white', width:wp('90%'), borderRadius:wp('1%'), borderWidth:wp('0.3%'), elevation:10, borderColor:'#A2D3FB', shadowOffset:{width:50, height:50}, shadowOpacity:0.8, shadowRadius:10, shadowColor:"red"}}>
                          <Image source={item.image.src} style={{width:wp('20%'), height:hp('12%'),}}/>
                          <View style={{textAlign:'start', width:wp('45%')}}>
                              <Text style={{textAlign:'left', color:'#4F4F4F', fontWeight:'bold', fontSize:wp('4%')}}>{item.name}</Text>
                              <Text style={{textAlign:'left', color:'#4F4F4F', fontWeight:'bold', fontSize:wp('3%')}}>{item.specs}</Text>
                              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:wp('2%')}}>
                                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                    <TouchableOpacity style={{padding:wp('1%')}} onPress={()=>{
                                        this.state.products[item.code].times++;
                                        this.setState({
                                            total:this.state.total-item.price
                                        });
                                    }}>
                                        <Image source={plus} style={{resizeMode:'contain', width:wp('5%'), height:wp('5%')}}/>
                                    </TouchableOpacity>
                                    <Text style={{color:'white', fontSize:wp('3%'), fontWeight:'bold', backgroundColor:'#1899FE', width:wp('4%'), textAlign:'center', borderRadius:wp('10%')}}> {item.times} </Text>
                                    <TouchableOpacity style={{padding:wp('1%')}} onPress={()=>{
                                      this.state.products[item.code].times--;
                                      this.setState({
                                        total:this.state.total+item.price
                                      });
                                    }}>
                                        <Image source={minus} style={{resizeMode:'contain', width:wp('5%'), height:wp('5%')}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                          </View>
                          <TouchableOpacity style={{backgroundColor:'#1899FE', borderRadius:wp('2%'), paddingHorizontal:wp('2%'), height:hp('3.5%'), justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color:'white', fontSize:wp('4%')}}> {localization.add} </Text>
                          </TouchableOpacity>
                      </View>
                    )
                    }
                }
                keyExtractor={item => toString(item.name)}
                style={{height:hp('66%')}}
                numColumns={1}
                /> 
            </View>
        </View>
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