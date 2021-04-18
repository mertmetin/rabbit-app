import { string, required, object} from 'yup';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import http from '../../../helpers/Http';
import { UserActivationForm } from './UserActivationForm';
import { showMessage, hideMessage } from "react-native-flash-message";

const validationSchema = object().shape({
    token: string().required('Token is required')
});

export const PostRegistration = props => {
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

    const submitHandler = (data) => {
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
        <>
            <UserActivationForm 
                submitHandler={submitHandler} 
                resendCode={resendCode}
                validationSchema={validationSchema} 
            />
        </>
    );
}