import * as React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Card(props) {
    const title = props.title;
    const img = props.img;
    const link = props.link;
    const data = props.data;
    const navigation = useNavigation();

    console.log(link);

    const onPress = () => {
        if (link)
            navigation.navigate(link, data);
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} >
                <View>
                    <Image style={styles.img} source={{ uri: 'http://localhost:8000/storage/' + img }} />
                </View>
                <View style={{ padding: 10 }}>
                    <Text>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
        marginTop: 20,
        marginBottom: 20,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    img: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        padding: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // marginTop: 10,
        // marginBottom: 10
    }
});