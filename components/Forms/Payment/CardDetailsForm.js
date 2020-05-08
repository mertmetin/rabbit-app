import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js/validate';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Container, Header, Text, Content, Form, Item, Input, Label, Icon, View } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import { GooglePlaces } from '../../GooglePlaces';
import constraints from '../../../constants/Constraints';
import http from '../../../helpers/Http';

export function CardDetailsForm(props) {
    const card = props.card;
    const [expiryDate, setExpiryDate] = React.useState(card.exp_month + '/' + card.exp_year); 
    const [errors, setErrors] = React.useState([]);
    const navigation = useNavigation();

    const onPress = () => {
        const fields = {
            expiry_date: expiryDate
        };

        const validation = validate(fields, constraints.credit_card_details);

        if (validation) {
            setErrors(validation);
            return false;
        }

        const expiryParts = expiryDate.split('/');
        card.exp_month = expiryParts[0];
        card.exp_year = expiryParts[1];

        http.post('updateCard', {
            paymentMethod: card
        })
        .then(res => {
            showMessage({
                message: 'Credit card updated successfully.',
                type: "success"
            });
            navigation.navigate('CardsScreen');
        }).catch(error => {
            showMessage({
                message: 'Unable to update the card.',
                type: "danger"
            });
        })
    }

    const removeCard = () => {
        http.post('deleteCard', {
            paymentMethod: card
        })
        .then(res => {
            showMessage({
                message: 'Credit card removed successfully.',
                type: "success"
            });
            navigation.navigate('CardsScreen');
        }).catch(error => {
            showMessage({
                message: 'Unable to remove the card.',
                type: "danger"
            }); 
        })
    }

    return (
        <View>
            <FloatingLabel label={'Card number'} value={'**** **** **** ' + card.last4} disabled />
            <FloatingLabel label={'mm/yy'} type={'date'} value={expiryDate} onTextChange={setExpiryDate} error={errors.expiry_date}/>
            <ActionButton title={'Remove saved card'} onPress={removeCard} />
            <ActionButton title={'Save Card'} onPress={onPress} />
        </View>
    );
}