import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const ErrorMessage =  ({ msg }) => <Text style={styles.errorMessage}>{msg}</Text>;

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 12, 
        color: 'red',
        alignSelf: 'flex-start',
    }
});