import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function CategoryCard(props) {
    const navigation = useNavigation();
    const item = props.item;
    const storeId = props.storeId;
    const onPress = () => {
        navigation.navigate(props.routeName, {item: item, storeId: storeId});
    };

    return (    
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }} activeOpacity={.7}>
                <View style={{backgroundColor: '#fff', borderRadius: 5}}>  
                    <Image style={styles.img} source={{ uri: item.image }} />
                </View>
                <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        width: '25%',
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
        width: 56,
        height: 56,
        resizeMode: 'contain',
        margin: 5
    },  
    text: {
        fontSize: 13,
        textAlign: 'center',
        marginTop: 6,
        color: '#22292F',
        fontFamily: 'sodo-sans-regular'
    }
});