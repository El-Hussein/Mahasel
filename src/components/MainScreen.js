import React,{Component} from 'react'
import { View, Image, ImageBackground, Text, StyleSheet, FlatList} from 'react-native'


class MainScreen extends Component {
    static navigationOptions = () => ({
        title: 'الرئيسيه',
        headerStyle: {
            backgroundColor: '#74b245'
        },
        headerTintColor: 'white',
    })
    constructor(){
        super();
        this.state = {
            data: [
                { image: require('../images/cat1.png'), cat: 'عسل' },
                { image: require('../images/cat2.png'), cat: 'خضروات' },
                { image: require('../images/cat3.png'), cat: 'نباتات' },
                { image: require('../images/cat1.png'), cat: 'عسل' },
                { image: require('../images/cat2.png'), cat: 'خضروات' },
                { image: require('../images/cat3.png'), cat: 'نباتات' },
            ]
        }
    }

    

    

    render(){
        return(
            <ImageBackground
             source={require('../images/main_background.png')}
             style={{flex: 1}}
            >
                <View style={{flex: 1}}>
                    <Image
                        source={require('../images/headImage.png')}
                        style={{ width: '100%', height: 280}}
                    />
                    <FlatList 
                        data={this.state.data}
                        renderItem={({item}) =>{
                            return(

                                <View
                                style={{  height: 120, marginLeft: 15, marginRight: 15, marginTop: 20, borderColor: 'gray' }}>
                                    <Image
                                        source={item.image}
                                        style={{ width: '100%', height: 150, marginBottom:10 ,borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                                    />
                                    <View style={styles.catView}>
                                        <Text style={styles.catTextStyle}>{item.cat}</Text>
                                    </View>
                                </View>
                            )
                            }
                        }
                        keyExtractor={item => toString(item.cat)}
                        // style={{height:hp('66%')}}
                        numColumns={1}
                        /> 
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
  
    catView: {
        flex: 1,
        top: -85,
        width:null,
        alignSelf:'flex-end',
    },
    catTextStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 60,
        paddingVertical: 8,
        color: '#fff',
        backgroundColor: '#f24f09',
        borderRadius: 5
    }
})

export default MainScreen