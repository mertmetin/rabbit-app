import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Container, Header, Content, Form, Item, Input, Label, Icon, View } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import { Link } from '../../Link';
import Colors from '../../../constants/Colors';
import axios from 'axios';

export function PasswordResetForm(props) {
    const [phone, setPhoneNumber] = React.useState('');
    const navigation = useNavigation();

    const onPress = () => {
        axios.post('http://localhost:8000/api/sendPasswordResetCode', {
            phone: phone,
        })
        .then(res => {
            const user_id = res.data;
            const params = {
                user_id: user_id,
                phone: phone
            }
            navigation.navigate('PasswordRecoveryScreen', params);
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
            <ActionButton title={'Send code'} onPress={onPress} />
        </View>
    );
}