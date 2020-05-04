import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js/validate';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Container, Header, Content, Form, Item, Input, Label, Icon, View } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import { Link } from '../../Link';
import constraints from '../../../constants/Constraints';
import axios from 'axios';

export function SignInForm(props) {
    const [phone, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const navigation = useNavigation();

    const onPress = () => {
        const fields = {
            phone: phone,
            password: password
        };

        const validation = validate(fields, constraints.signin);

        if (validation) {
            setErrors(validation)
            return false;
        }

        axios.post('http://localhost:8000/login', {
            phone: phone,
            password: password
        })
        .then(res => {
            navigation.navigate(props.navigateTo);
        }).catch(error => {
            setErrors({ 'password': 'The phone number and password you entered don\'t match'});
        })
    }

    return (
        <View>
            <FloatingLabel label={'Phone number'} type={'phone_number'} value={phone} onTextChange={setPhoneNumber} keyboardType={'numeric'} error={errors.phone} />
            <FloatingLabel label={'Password'} value={password} onTextChange={setPassword} error={errors.password}  secure={true} />
            <ActionButton title={'Sign in'} onPress={onPress} />
            <Link value={'Forgot password?'} link={'PasswordResetScreen'} />
        </View>
    );
}