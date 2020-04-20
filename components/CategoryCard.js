import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function CategoryCard(props) {
    return (    
        <View style={styles.container}>
            <TouchableOpacity>
                <Image style={styles.img} source={{ uri: 'http://localhost:8000/storage/' + props.image }} />
                <Text style={styles.text}>{props.title}</Text>
            </TouchableOpacity>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        width: '25%',
        padding: 10
        // flex: '0 0 25%'
        // height: 100 
    },
    img: {
        width: '100%',
        height: 85,
        borderBottomLeftRadius:10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },  
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10
    }
});