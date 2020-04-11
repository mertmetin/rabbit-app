import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function LoginScreen({ navigation }) {
    const [phoneNumber, onChangeText] = React.useState('Phone Number');

    return (
        <ScrollView contentContainerStyle={styles.containerStyle}>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType={'numeric'}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password (min 4 characters)"
                />
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}> Login </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.forgotPasswordButton}
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={styles.forgotPasswordText}>
                        Forgot Password
                </Text>
                </TouchableOpacity >
            </View>
            <View>
                <TouchableOpacity style={styles.registerButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.registerText}>
                        Register
                    </Text>
                </TouchableOpacity >
            </View>
        </ScrollView>
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
        padding:15,
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
})