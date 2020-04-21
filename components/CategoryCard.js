import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function CategoryCard(props) {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('Products', {category: props.id});
    };

    return (    
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View>  
                    <Image style={styles.img} source={{ uri: 'http://localhost:8000/storage/' + props.image }} />
                </View>
                <Text style={styles.text}>{props.title}</Text>
            </TouchableOpacity>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        width: '25%',
        padding: 10,
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
        width: '100%',
        height: 90,
        borderBottomLeftRadius:10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        // marginTop: 10,
        // marginBottom: 10
    },  
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        color: '#22292F',
        fontFamily: 'sodo-sans-regular'
    }
});