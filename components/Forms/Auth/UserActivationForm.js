import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js/validate';
import { Ionicons } from '@expo/vector-icons';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import { showMessage, hideMessage } from "react-native-flash-message";
import constraints from '../../../constants/Constraints';
import http from '../../../helpers/Http';

export function UserActivationForm(props) {
    const userId = props.params.user_id;
    const phone = props.params.phone;
    const [token, setToken] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const navigation = useNavigation();

    const resendCode = () => {
        http.post('resendCode', {
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
        const fields = {
            token: token
        };
        const validation = validate(fields, constraints.activation);

        if (validation) {
            setErrors(validation)
            return false;
        }
        
        http.post('activateUser', {
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
            setErrors({ 'token': msg });
        })
    }

    return (
        <View>
            <Text style={styles.activationText}>Please type the activation code sent to your phone number.</Text>
            <FloatingLabel label={'Token'} value={token} onTextChange={setToken} error={errors.token} />
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