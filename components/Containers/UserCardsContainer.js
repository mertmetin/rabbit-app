import React, { Component, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";
import { UserCardsList } from '../Lists/UserCardsList';

export const UserCardsContainer = props => {
    const user_id = props.user_id;
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const onPress = (payment_method_id) => {
        http.delete(`payment/methods/${payment_method_id}`)
        .then(res => {
            showMessage({
                message: 'Credit card removed successfully.',
                type: "success"
            });
            setCount(count - 1);
        }).catch(error => {
            showMessage({
                message: 'Unable to remove the card.',
                type: "danger"
            });
        })
    }

    useEffect(() => {
        http.get(`payment/methods?user_id=${user_id}`)
        .then(result => {
            setData(result.data)
            setCount(result.data.length);
        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }, [count]);

    return (
        <UserCardsList data={data} onPress={onPress} />
    )
}