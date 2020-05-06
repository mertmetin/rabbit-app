import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js/validate';
import { Container, Header, Content, Form, Item, Input, Label, Icon, View } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import { Link } from '../../Link';
import constraints from '../../../constants/Constraints';
import http from '../../../helpers/Http';

// import axios from 'axios';

export function PasswordResetForm(props) {
    const [phone, setPhoneNumber] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const navigation = useNavigation();

    const onPress = () => {
        const fields = {
            phone: phone
        };
        const validation = validate(fields, constraints.password_reset);

        if (validation) {
            setErrors(validation)
            return false;
        }

        http.post('sendPasswordResetCode', {
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
            setErrors({ 'phone': msg });
        })
    }

    return (
        <View>
            <FloatingLabel label={'Phone number'} type={'phone_number'} value={phone} 
                onTextChange={setPhoneNumber} error={errors.phone} />
            <ActionButton title={'Send code'} onPress={onPress} />
        </View>
    );
}