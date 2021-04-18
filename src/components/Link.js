import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function Link(props) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {navigation.navigate(props.link)}}>
            <Text style={styles.text}>{props.value}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#00754a',
        fontSize: 16,
        fontFamily: 'sodo-sans-semibold',
        paddingTop: 10,
        paddingBottom: 10
    }
});