import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from 'axios';

export default function ChangePasswordScreen({ navigation, route }) {
    const userId = route.params.userId;
    const [oldPassword, setOldPassword] = React.useState('');
    const [password, setPassword ] = React.useState('');

    return (
        <ScrollView contentContainerStyle={styles.containerStyle}>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Old Password"
                    keyboardType={'numeric'}
                    secureTextEntry={true}
                    onChangeText={(text) => setOldPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Password (min 4 characters)"
                    keyboardType={'numeric'}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.submitButton}
                    onPress={() => {
                        axios.post('http://localhost:8000/api/changePassword', {
                            userId: userId,
                            oldPassword: oldPassword,
                            password: password
                        })
                        .then(res => {
                            showMessage({
                                message: "Your password has been changed successfully.",
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
                    }}
                >
                    <Text style={styles.submitButtonText}> Save </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center'
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
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center'
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
});