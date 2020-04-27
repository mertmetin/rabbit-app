import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { showMessage, hideMessage } from "react-native-flash-message";
import { ActionButton } from '../../../components/ActionButton';
import { FloatingLabel } from '../../../components/FloatingLabel';
import axios from 'axios';

export default function CardDetailsScreen({ navigation, route }) {
    const paymentMethod = route.params.paymentMethod;
    const [expiryDate, setExpiryDate] = React.useState(paymentMethod.exp_month + '/' + paymentMethod.exp_year); 

    const onPress = () => {
        const expiryParts = expiryDate.split('/');
        paymentMethod.exp_month = expiryParts[0];
        paymentMethod.exp_year = expiryParts[1];

        axios.post('http://localhost:8000/api/updateCard', {
            paymentMethod: paymentMethod
        })
        .then(res => {
            showMessage({
                message: 'Credit card updated successfully.',
                type: "success"
            });
            navigation.navigate('Profile');
        }).catch(error => { 
            showMessage({
                message: 'Unable to update the card.',
                type: "danger"
            });
        })
    }

    const removeCard = () => {
        axios.post('http://localhost:8000/api/deleteCard', {
            paymentMethod: paymentMethod
        })
        .then(res => {
            showMessage({
                message: 'Credit card removed successfully.',
                type: "success"
            });
            navigation.navigate('Profile');
        }).catch(error => {
            showMessage({
                message: 'Unable to remove the card.',
                type: "danger"
            });
        })
    }

    return (
        <ScrollView style={styles.container}>
            <FloatingLabel label={'Card number'} value={'**** **** **** ' + paymentMethod.last4}/>
            <View>
                <FloatingLabel label={'mm/yy'} type={'date'} value={expiryDate} onTextChange={setExpiryDate} />
                <FloatingLabel label={'CVC'} value={'264'} />
            </View>
            <ActionButton title={'Remove saved card'} onPress={removeCard} />
            <ActionButton title={'Save Card'} onPress={onPress} />
        </ScrollView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});