import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

export default function RegisterScreen({ navigation, route }) {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');

    return (
        <ScrollView contentContainerStyle={styles.containerStyle}>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType={'numeric'}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password (min 4 characters)"
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Fullname"
                    onChangeText={(text) => setFullName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                />
                <TouchableOpacity style={styles.registerButton}
                    onPress={ () => {
                        axios.post('http://localhost:8000/api/register', {
                            phone: phoneNumber,
                            name: fullName,
                            email: email,
                            password: password
                        })
                        .then(res => {
                            const user_id = res.data;
                            navigation.navigate('UserActivation', {user_id: user_id});
                        }).catch(error => {
                            console.log(error.response.data);
                        })


                        // axios.get(`https://jsonplaceholder.typicode.com/users`)
                        //     .then(res => {
                        //         const persons = res.data;
                        //         alert(fullName);
                        //     })
                        }
                    }
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
        backgroundColor: '#6a69c3',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    registerText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})