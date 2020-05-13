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
            <TouchableOpacity onPress={onPress}>
                <View style={{ backgroundColor: '#fff', borderRadius: 5 }}>
                    <Image style={styles.img} source={{ uri: 'http://localhost:8000/storage/' + item.image }} />
                </View>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.text}>${item.price}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // height: 75,
        // width: '33%',
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
        width: 75,
        height: 75,
        resizeMode: 'cover',
        // padding: 10
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        color: '#22292F',
        fontFamily: 'sodo-sans-regular'
    }
});