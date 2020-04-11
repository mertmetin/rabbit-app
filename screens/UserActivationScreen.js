import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import OTPTextView from 'react-native-otp-textinput';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function UserActivationScreen({navigation, route}) {
    const userId = route.params.user_id;
    const phone = route.params.phone;

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
                                user_id: userId,
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
                <TouchableOpacity style={styles.resendContainer}
                    onPress={() => {
                        axios.post('http://localhost:8000/api/resendCode', {
                            user_id: userId,
                            phone: phone
                        })
                        .then(res => {
                            showMessage({
                                message: "Activation code has been sent successfully.",
                                type: "success",
                            });
                        }).catch(error => {
                            const msg = error.response.data.message;
                            showMessage({
                                message: msg,
                                type: "danger"
                            });
                        })
                    }}
                >
                    <Ionicons name="md-refresh" size={30} color="rgba(0,0,0,0.35)" />

                    <Text style={styles.resendText}>
                        Resend Code
                    </Text>
                </TouchableOpacity >
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
    },
    resendContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    resendText: {
        marginLeft: 10,
        color: "rgba(0,0,0,0.35)"
    }
});