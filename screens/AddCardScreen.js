import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function PaymentMethodsScreen({ navigation, route }) {
    const userId = route.params.userId;
    const [cardNumber, setCardNumber] = React.useState('');
    const [expiration, setExpiration] = React.useState('');

    return(
        <ScrollView contentContainerStyle={styles.containerStyle}>
            <View style={viewStyle.containerStyle}>
                <TextInput
                    style={styles.input}
                    placeholder="Card No"
                    keyboardType={'numeric'}
                    onChangeText={(text) => setCardNumber(text)}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Expiration Date"
                    onChangeText={(text) => setExpiration(text)}
                />
                <TouchableOpacity style={styles.submitButton}
                    onPress={() => {
                        axios.post('http://localhost:8000/api/registerCustomer', {
                            userId: userId
                            // phone: phone,
                            // password: password
                        })
                        .then(res => {
                            const customerId = res.data; 

                            axios.post('http://localhost:8000/api/addCard', {
                                customerId: customerId,
                                number: cardNumber
                            })
                            .then(res => {
                                // const customerId = res.data;


                            }).catch(error => {
                                const msg = error.response.data.message;
                                showMessage({
                                    message: msg,
                                    type: "danger"
                                });
                            })

                         
                        }).catch(error => {
                            const msg = error.response.data.message;
                            showMessage({
                                message: msg,
                                type: "danger"
                            });
                        })
                    }}
                >
                    <Text style={styles.submitButtonText}> Continue </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
    return (
        <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                    <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
            </View>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        paddingTop: 25,
        paddingBottom: 25,
        backgroundColor: 'rgb(254, 254, 254)',
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%'
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
    submitButton: {
        borderRadius: 5,
        backgroundColor: '#7a42f4',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center'
    },
    forgotPasswordButton: {
        marginTop: 20,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#6d828b'
    },
    forgotPasswordText: {
        color: '#6d828b'
    },
    registerButton: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#6a69c3',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    registerText: {
        color: '#6a69c3',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

const viewStyle = StyleSheet.create({
    containerStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginTop: 25,
        marginBottom: 25
    }
});