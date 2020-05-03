import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showMessage, hideMessage } from "react-native-flash-message";
import OTPTextView from 'react-native-otp-textinput';
import { Ionicons } from '@expo/vector-icons';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import Colors from '../../../constants/Colors';
import axios from 'axios';

export function UserActivationForm(props) {
    const userId = props.params.user_id;
    const phone = props.params.phone;
    const [token, setToken] = React.useState('');
    const navigation = useNavigation();

    const resendCode = () => {
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
    }

    const onPress = () => {
        axios.post('http://localhost:8000/api/activateUser', {
            user_id: userId,
            token: token,
        })
        .then(res => {
            showMessage({
                message: "You're activated successfully.",
                type: "success",
            });
            navigation.navigate(props.navigateTo);
        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }

    return (
        <View>
            <Text style={styles.activationText}>Please type the activation code sent to your phone number.</Text>
            <FloatingLabel label={'Token'} value={token} onTextChange={setToken} />
            <ActionButton title={'Activate'} onPress={onPress} />
            <View style={{marginTop: 20}}>
                <ActionButton title={'Resend code'} onPress={resendCode} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    activationText: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
});