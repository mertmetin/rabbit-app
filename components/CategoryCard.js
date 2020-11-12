import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function CategoryCard(props) {
    const navigation = useNavigation();
    const item = props.item;
    const onPress = () => {
        navigation.navigate(props.routeName, {item: item});
    };

    return (    
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }} activeOpacity={.7}>
                <View style={{backgroundColor: '#fff', borderRadius: 5}}>  
                    <Image style={styles.img} source={{ uri: 'http://localhost:8000/storage/' + item.image }} />
                </View>
                <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        // height: 75,
        // width: '33%',
        flexBasis: '25%',
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
        width: 70,
        height: 70,
        resizeMode: 'cover',
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