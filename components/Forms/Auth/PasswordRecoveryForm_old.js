import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js/validate';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Container, Header, Text, Content, Form, Item, Input, Label, Icon, View } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import { Link } from '../../Link';
import constraints from '../../../constants/Constraints';
import http from '../../../helpers/Http';

export function PasswordRecoveryForm(props) {
    const userId = props.params.user_id;
    const phone = props.params.phone;
    const [token, setToken] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const navigation = useNavigation();

    const onPress = () => {
        const fields = {
            token: token,
            password: password
        };
        const validation = validate(fields, constraints.password_recovery);

        if (validation) {
            setErrors(validation)
            return false;
        }
        if (token != props.params.token)
        {
            showMessage({
                message: 'Wrong code entered',
                type: "danger"
            });
            return;
        }

        http.patch(`users/${userId}/password/reset`, {
            user_id: userId,
            token: token,
            password: password
        })
        .then(res => {
            showMessage({
                message: "You password has been changed successfully.",
                type: "success",
            });
            navigation.navigate('AccountScreen');
        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }

    const resendCode = () => {
        http.post('users/password/recovery', {
            user_id: userId,
            phone: phone
        })
        .then(result => {
            showMessage({
                message: "Password reset code has been sent successfully.",
                type: "success",
            });
            props.params.token = result.data.token;
        }).catch(error => {
            // const msg = error.response.data.message;
            // showMessage({
            //     message: msg,
            //     type: "danger"
            // });
        })
    }

    return (
        <View>
            <Text>Please type the reset code sent to your phone number.</Text>
            <FloatingLabel label={'Token'} value={token} onTextChange={setToken} error={errors.token} />
            <FloatingLabel label={'New Password (min 4 characters)'} secure={true} value={password} 
                onTextChange={setPassword} error={errors.password} />
            <ActionButton title={'Send'} onPress={onPress} />
            <View style={{marginTop: 20}}>
                <ActionButton title={'Resend code'} onPress={resendCode} />
            </View>
        </View>
    )
}