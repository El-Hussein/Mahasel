import React from 'react'

import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import localization from '../localization/localization';
import {I18nManager} from 'react-native';


class Header extends React.Component {
    render() {
        return (
            <View style={styles.header}>
                <TouchableOpacity style={{position:'absolute', left:wp('4%')}} onPress={()=>this.props.navigation.dispatch(NavigationActions.back())}>
                    <Icon name={!I18nManager.isRTL?"arrow-left":"arrow-right"} color="#538805" size={wp('7%')}/>
                </TouchableOpacity>
                <Text style={{fontSize:wp('5%'), fontWeight:'bold', textAlign:'right', color:'#538805', paddingRight:wp('2%')}}> {this.props.title} </Text>
                <TouchableOpacity  style={{position:'relative', right:wp('0%')}} onPress={()=>this.props.drawer=='stop'?null:this.props.navigation.toggleDrawer()}>
                    <Icon name="bars" color="#538805" size={wp('7%')}/>
                </TouchableOpacity>
            </View>
        )
    }
}
export default withNavigation(Header);
// export default Header;



const styles = StyleSheet.create({
    header:{
        height:hp('7%'),
        backgroundColor:"#B7E212",
        justifyContent:'flex-end',
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
});