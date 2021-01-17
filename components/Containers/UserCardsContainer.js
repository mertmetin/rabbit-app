import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";
import { UserCardsList } from '../Lists/UserCardsList';

export const UserCardsContainer = props => {
    const user_id = props.user_id;
    const [data, setData] = React.useState('');

    React.useEffect(() => {
        http.get(`payment/methods?user_id=${user_id}`, {
            // user_id: userId
        })
        .then(result => {
            setData(result.data)
            // if (!res.data)
            //     return;

            // const paymentMethods = res.data;
            // const items = makeItems(paymentMethods);
            // setPaymentMethods(items);

        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }, []);


    const onPress = (payment_method_id) => {
        http.delete(`payment/methods/${payment_method_id}`)
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
        <UserCardsList data={data} onPress={onPress} />
    )
}