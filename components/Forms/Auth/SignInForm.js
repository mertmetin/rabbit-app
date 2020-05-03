import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Container, Header, Content, Form, Item, Input, Label, Icon, View } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import { Link } from '../../Link';
import Colors from '../../../constants/Colors';
import axios from 'axios';

export function SignInForm(props) {
    const [phone, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation();

    const onPress = () => {
        console.log(password);
        axios.post('http://localhost:8000/login', {
            phone: phone,
            password: password
        })
            .then(res => {
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
            <FloatingLabel label={'Phone number'} value={phone} onTextChange={setPhoneNumber} />
            <FloatingLabel label={'Password'} value={password} onTextChange={setPassword} />
            <ActionButton title={'Sign in'} onPress={onPress} />
            <Link value={'Forgot password?'} link={'PasswordResetScreen'} />
        </View>
    );
}