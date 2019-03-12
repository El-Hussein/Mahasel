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
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions';
import localization from '../../localization/localization';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';


import market1 from '../../assets/images/market1.jpeg';
import market2 from '../../assets/images/market2.jpeg';
import market3 from '../../assets/images/market3.jpeg';
import market4 from '../../assets/images/market4.jpeg';
import market5 from '../../assets/images/market5.jpeg';
import market6 from '../../assets/images/market6.jpg';
import market7 from '../../assets/images/market7.jpeg';
import market8 from '../../assets/images/market8.jpg';
import market9 from '../../assets/images/market9.jpeg';
import BG from '../../assets/images/bg.png';
import bgMarket from '../../assets/images/bgMarket.jpg';

// const Slider = props => ( <View style={[styles.imageContainer, {alignItems:'center', justifyContent:'center', marginTop:10,}]}>
//         <Image style={{height:hp('14.8%'), width:wp('99%')}} source={props.uri} resizeMode="contain"/>
//     </View>
// )

class Home extends Component{

  constructor(props) {
    super()
    this.state = {
      products: [
        {code:0, image:{src: market1, width:2480, height:3508}, name:"اطعمة لماركات",},
        {code:1, image:{src: market2, width:2480, height:3508}, name:"الفاكهه",},
        {code:2, image:{src: market3, width:2480, height:3508}, name:"الشاي والقهوة",},
        {code:3, image:{src: market4, width:2480, height:3508}, name:"الخضروات",},
        {code:4, image:{src: market5, width:2480, height:3508}, name:"المشروبات الغازية",},
        {code:5, image:{src: market6, width:2480, height:3508}, name:"العناية الشخصية",},
        {code:6, image:{src: market7, width:2480, height:3508}, name:"الالبان",},
        {code:7, image:{src: market8, width:2480, height:3508}, name:"الشاي والقهوه",},
        {code:8, image:{src: market9, width:2480, height:3508}, name:"اللحوم المجمدة",},
      ],
    }
  }
  
  render () {
    return (
      // <ImageBackground source={BG} style={{width:wp('100%'), height:hp('100%')}}>
        <View style={{backgroundColor:'white', flex:1}}>
          <Image source={bgMarket} style={{width:wp('100'), height:hp('30%'), position:'absolute'}}/>
            {/* Header */}
            <Header/>
            <View style={{}}>
              <View style={{alignSelf:'flex-start'}}>
                <Text style={{fontSize:wp('6%'), textAlign:'left', color:'white', width:'auto', marginVertical:hp('3$'), backgroundColor:'rgba(0, 61, 124, 0.8)'}}> {localization.merchentName} </Text>
              </View>
              <View style={{backgroundColor:'rgba(33, 150, 243, 0.7)', marginHorizontal:wp('10%'), flexDirection:'row', justifyContent:'center', alignItems:'center', width:wp('80%'), height:hp('6%'), borderRadius:wp('6%'), borderColor:'white', borderWidth:wp('0.2%')}}>
                <TextInput
                  style={{padding:0, color:'white', fontSize:wp('5%'), fontWeight:'bold', width:wp('65%'), textAlign:'center', textAlignVertical:'center'}}
                  placeholder={localization.SearchPlaceHolder}
                  placeholderTextColor="white"
                  onChangeText={(text)=>this.setState({text})}
                />
                <Icon name="search" size={wp('5%')} color="white"/>
              </View>
            </View>


            <FlatList 
                data={this.state.products}
                renderItem={({item}) =>{
                  return(
                    
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Products')} style={{paddingVertical:hp('0.7%'), paddingHorizontal:wp('1.2%')}}>
                          <Image source={item.image.src} style={{width:wp('29%'), height:hp('12%'),borderRadius:wp('2%'), borderColor:'#A2D3FB', borderWidth:wp('0.3%'),}}/>
                          <View style={{textAlign:'center'}}>
                              {/* <Text style={{textAlign:'center', color:'#BEDAF2', fontWeight:'bold', fontSize:wp('3.5%')}}>{item.name}</Text> */}
                              <Text style={{textAlign:'center', color:'#373737', fontWeight:'bold', fontSize:wp('3.5%')}}>{item.name}</Text>
                          </View>
                      </TouchableOpacity>
                    )
                    }
                }
                keyExtractor={item => toString(item.name)}
                style={{marginHorizontal:wp('3%'), width:wp('94%'), marginTop:hp('1%')}}
                numColumns={3}
                />

            <TouchableOpacity style={{backgroundColor:'rgb(33, 150, 243)', marginHorizontal:wp('20%'), flexDirection:'row', justifyContent:'center', alignItems:'center', width:wp('60%'), height:hp('5%'), borderRadius:wp('6%'), borderColor:'white', borderWidth:wp('0.3%'), marginVertical:hp('5%')}}>
              <Text style={{color:'white', fontSize:wp('5%')}}> {localization.freeDlievery} </Text>
            </TouchableOpacity>
          </View>
        // {/* // </ImageBackground> */}
    )
  }
}

export default Home;

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