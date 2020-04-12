import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import OTPTextView from 'react-native-otp-textinput';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function PasswordReset({ navigation, route }) {
    const userId = route.params.user_id;
    const phone = route.params.phone;
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState('');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.activationText}>Please type the reset code sent to your phone number.</Text>
                <OTPTextView
                    containerStyle={styles.OTPContainerStyle}
                    handleTextChange={(text) => setToken(text)}
                    inputCount={4}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="New Password (min 4 characters)"
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.resetButton}
                    onPress={() => {
                        axios.post('http://localhost:8000/api/resetPassword', {
                            user_id: userId,
                            token: token,
                            password: password
                        })
                            .then(res => {
                                showMessage({
                                    message: "You password has been changed successfully.",
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
                    }
                >
                    <Text style={styles.resetText}>
                        Reset Password
                    </Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.resendContainer}
                    onPress={() => {
                        axios.post('http://localhost:8000/api/sendPasswordResetCode', {
                            user_id: userId,
                            phone: phone
                        })
                            .then(res => {
                                showMessage({
                                    message: "Password reset code has been sent successfully.",
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
    input: {
        margin: 15,
        marginLeft: 20,
        marginRight: 20,
        padding: 15,
        height: 50,
        borderRadius: 5,
        borderColor: '#cacaca',
        borderWidth: 1
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
    resetButton: {
        marginTop: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#6a69c3',
        backgroundColor: '#6a69c3',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    resetText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    resendText: {
        marginLeft: 10,
        color: "rgba(0,0,0,0.35)"
    }
});