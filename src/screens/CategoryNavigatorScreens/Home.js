import React,{Component} from 'react'
import { 
  View, 
  Image, 
  ImageBackground, 
  Text, 
  StyleSheet, 
  FlatList,
  ScrollView,
  TouchableOpacity,
  I18nManager
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

import Header from '../../components/Header';
import cat1 from '../../assets/images/cat1.png';
import cat2 from '../../assets/images/cat2.png';
import cat3 from '../../assets/images/cat3.png';
import main_background from '../../assets/images/bg1.png';
import headImage from '../../assets/images/headImage.png';

class MainScreen extends Component {

    constructor(){
        super();
        this.state = {
            data: [
                { image: cat1, cat: 'عسل' },
                { image: cat2, cat: 'خضروات' },
                { image: cat3, cat: 'نباتات' },
                { image: cat1, cat: 'عسل' },
                { image: cat2, cat: 'خضروات' },
                { image: cat3, cat: 'نباتات' },
            ]
        }
    }

    

    

    render(){
        return(
            <ImageBackground
             source={main_background}
             style={{flex: 1}}
            >
                {/* HEADER */}
                <Header title={localization.home} backScreen="SignIn"/>
                
                <ScrollView>
                    <Image source={headImage} style={{ width: wp('100%'), height: hp('42%')}} />

                    <FlatList 
                        data={this.state.data}
                        renderItem={({item}) =>{
                            return(

                                <View style={{ borderColor: '#DD1E1A', marginHorizontal:wp('8%')}}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Products')}}>
                                      <Image source={item.image} style={{ width: wp('84%'), height:hp('22%'), }}/>

                                      <View style={styles.catView}>
                                          <Text style={[styles.catTextStyle, !I18nManager.isRTL?{borderTopLeftRadius: wp('1%'), borderBottomLeftRadius: wp('1%') }:{borderTopRightRadius: wp('1%'), borderBottomRightRadius: wp('1%') }]}>{item.cat}</Text>
                                      </View>
                                    </TouchableOpacity>
                                </View>
                            )
                            }
                        }
                        keyExtractor={item => toString(item.cat)}
                        // style={{height:hp('66%')}}
                        numColumns={1}
                        /> 
                </ScrollView>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
  
    catView: {
        flex: 1,
        top: hp('5%'),
        right: 0,
        position:'absolute',
        width:null,
    },
    catTextStyle: {
        fontWeight: 'bold',
        fontSize: wp('6%'),
        paddingHorizontal: wp('5%'),
        color: '#fff',
        backgroundColor: '#f24f09',
        
    }
})

export default MainScreen