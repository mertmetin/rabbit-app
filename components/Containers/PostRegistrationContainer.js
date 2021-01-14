import * as Yup from 'yup';
import Token from '../../helpers/Token';
import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import { UserActivationForm } from '../Forms/Auth/UserActivationForm';
import { showMessage, hideMessage } from "react-native-flash-message";

const PostRegistrationValidationSchema = Yup.object().shape({
    token: Yup.string().required('Token is required')
});

export const PostRegistrationContainer = props => {
    const data = props.data;
    const user_id = data.id;
    const navigation = useNavigation();

    const resendCode = () => {
        http.post(`users/${user_id}/token/resend`, {
            user_id: user_id,
            phone: data.phone
        })
        .then(res => {
            showMessage({
                message: "Activation code has been sent successfully.",
                type: "success",
            });
        }).catch(error => {
            showMessage({
                message: error.message,
                type: "danger",
            });
        })
    }

    const onPress = (data) => {
        http.patch(`users/${user_id}/activate`, {
            token: data.token,
        })
        .then(res => {
            showMessage({
                message: "You're activated successfully.",
                type: "success",
            });
            navigation.navigate('AccountScreen');
        }).catch(error => {
            showMessage({
                message: error.message,
                type: "danger",
            });
        })
    }

    return (
        <React.Fragment>
            <UserActivationForm onPress={onPress} resendCode={resendCode}
                validationSchema={PostRegistrationValidationSchema} />
        </React.Fragment>
    );
}