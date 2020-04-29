import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { showMessage, hideMessage } from "react-native-flash-message";
import { ActionButton } from '../../../components/ActionButton';
import { FloatingLabel } from '../../../components/FloatingLabel';
import axios from 'axios';

export default function AddCardScreen({ navigation, route }) {
    const userId = route.params.userId;
    const [cardNumber, setCardNumber] = React.useState('');
    const [cvc, setCVC] = React.useState('');
    const [expiryDate, setExpiryDate] = React.useState('');

    const onPress = () => {
        axios.post('http://localhost:8000/api/registerCustomer', {
            userId: userId
        })
        .then(res => {
            const customerId = res.data;

            axios.post('http://localhost:8000/api/addCard', {
                customerId: customerId,
                number: cardNumber
            })
            .then(res => {
                navigation.navigate('Profile');
            }).catch(error => {
                const msg = error.response.data.message;
                showMessage({
                    message: msg,
                    type: "danger"
                });
            })
        })
        .catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }

    return(
        <ScrollView>
            <View style={styles.container}>
                <FloatingLabel label={'Card No'} type={'credit_card'} onTextChange={setCardNumber} value={cardNumber} />
                <FloatingLabel label={'CVC'} onTextChange={setCVC} value={cvc} maxLength={4} />
                <FloatingLabel label={'Expiry Date'} type={'date'} value={'264'} onTextChange={setExpiryDate} value={expiryDate} />   
            </View>
            <ActionButton title={'Add Card'} onPress={onPress} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});