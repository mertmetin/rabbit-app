import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import OTPTextView from 'react-native-otp-textinput';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function UserActivationScreen({navigation, route}) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.activationText}>Please type the activation code sent to your phone number.</Text>
                <OTPTextView
                    containerStyle={styles.OTPContainerStyle}
                    handleTextChange={(token) => {
                        if (token.length == 4)
                        {
                            axios.post('http://localhost:8000/api/activateUser', {
                                user_id: route.params.user_id,
                                token: token,
                            })
                            .then(res => {
                                showMessage({
                                    message: "You're activated successfully.",
                                    type: "success",
                                });
                                navigation.navigate('Home');
                            }).catch(error => {
                                const msg = error.response.data.message;
                                showMessage({
                                    message: msg,
                                    type: "danger"
                                });
                            })
                        }
                    }}
                    inputCount={4}
                    keyboardType="numeric"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
    },
    subContainer: {
        padding: 50,
    },  
    activationText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    containerStyle: {
        marginTop: 25
    },  
    OTPContainerStyle: {
        marginTop: 25,
    }
});