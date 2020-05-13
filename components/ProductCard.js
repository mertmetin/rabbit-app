import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function ProductCard(props) {
    const navigation = useNavigation();
    const item = props.item;
    const onPress = () => {
        navigation.navigate(props.routeName, { item: item });
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={{alignItems:'center'}}>
                <View style={{ backgroundColor: '#fff', borderRadius: 5 }}>
                    <Image style={styles.img} source={{ uri: 'http://localhost:8000/storage/' + item.image }} />
                </View>
                <View style={{alignItems: 'flex-start'}}>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text style={styles.text}>${item.price}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // height: 75,
        // width: '33%',
        flexBasis: '32.5%',
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        // boxShadow: 0px 4px 42px rgba(0, 0, 0, 0.25);
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        // alignItems: 'center'
        margin: 5
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        color: '#22292F',
        fontFamily: 'sodo-sans-regular'
    }
});