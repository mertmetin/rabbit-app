import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js/validate';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Container, Header, Text, Content, Form, Item, Input, Label, Icon, View } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import constraints from '../../../constants/Constraints';
import http from '../../../helpers/Http';

export function ChangePasswordForm(props) {
    const userId = props.userId;
    const [oldPassword, setOldPassword] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const navigation = useNavigation();

    const onPress = () => {
        const fields = {
            old_password: oldPassword,
            password: password
        };
        const validation = validate(fields, constraints.password_change);

        if (validation) {
            setErrors(validation)
            return false;
        }

        http.post('changePassword', {
            userId: userId,
            oldPassword: oldPassword,
            password: password
        })
        .then(res => {
            showMessage({
                message: "Your password has been changed successfully.",
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

    return(
        <View>
            <FloatingLabel label={'Old Password'} value={oldPassword} secure={true} 
                onTextChange={setOldPassword} error={errors.old_password} />
            <FloatingLabel label={'New Password (min 4 characters)'} secure={true} value={password} 
                onTextChange={setPassword} error={errors.password} />
            <ActionButton title={'Save'} onPress={onPress} />
        </View>  
    )
}