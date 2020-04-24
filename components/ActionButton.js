import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';

export function ActionButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        borderTopColor: Colors.accentGreen,
        borderTopWidth: 1,
        borderBottomColor: Colors.accentGreen,
        borderBottomWidth: 1,
        borderLeftColor: Colors.accentGreen,
        borderLeftWidth: 1,
        borderRightColor: Colors.accentGreen,
        borderRightWidth: 1,
        borderRadius: 50
    },
    text: {
        fontSize: 18,
        fontFamily: 'sodo-sans-semibold',
        color: Colors.accentGreen,
        paddingTop: 7.5,
        paddingBottom: 7.5,
        paddingLeft: 15,
        paddingRight: 15
    }
});