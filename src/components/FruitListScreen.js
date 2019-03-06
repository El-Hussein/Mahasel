import React, { Component } from 'react'
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity,StatusBar } from 'react-native'
import { Icon } from 'react-native-elements';


class FruitListScreen extends Component {
    static navigationOptions = () => ({
        title: 'الطلبات',
        headerStyle: {
            backgroundColor: '#74b245'
        },
        headerTintColor: 'white',
    })
    state = {
        data: [
            { image: require('../images/item1.png'), cat: 'مانجو سكرى', qun: '3 كيلو', price: '35.00 ريال', date: '15 يناير 2019', discription: 'مانجو انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه' },
            { image: require('../images/item2.png'), cat: 'برتقال بلدى', qun: '3 كيلو', price: '25.00 ريال', date: '17 يناير 2019', discription: 'برتقال انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه'  },
            { image: require('../images/item3.png'), cat: 'تفاح لبنانى', qun: '3 كيلو', price: '35.00 ريال', date: '15 يناير 2019',discription: 'تفاح انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه'  },
            { image: require('../images/item4.png'), cat: 'بطيخ', qun: '3 كيلو', price: '35.00 ريال', date: '15 يناير 2019',discription: 'بطيخ انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه'  },
            { image: require('../images/item1.png'), cat: 'مانجو سكرى', qun: '3 كيلو', price: '35.00 ريال', date: '15 يناير 2019',discription: 'مانجو انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه'  },
            { image: require('../images/item2.png'), cat: 'برتقال بلدى', qun: '3 كيلو', price: '25.00 ريال', date: '17 يناير 2019',discription: 'برتقال انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه'  },
        ]
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ListItem', {item})}>
                <View
                    style={{ flex: 1, borderWidth: 1, height: 120, marginLeft: 15, marginRight: 15, marginTop: 30, borderColor: 'red', borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', flex: 1, marginRight: 30, marginTop: 6 }}>
                            <Text style={styles.text}>{item.cat}</Text>
                            <Text style={styles.text}>{item.qun}</Text>
                            <Text style={styles.text}>{item.price}</Text>
                            <View style={{ justifyContent: 'flex-end', flex: 1, marginRight: 65, marginBottom: 5 }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000' }}>{item.date}</Text>
                            </View>

                        </View>
                        <View style={{ alignItems: 'flex-end', flex: 1 }}>
                            <Image
                                source={item.image}
                                style={{ width: 170, height: 120, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'

    }
})
export default FruitListScreen;