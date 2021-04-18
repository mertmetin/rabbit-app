import React, { Component, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";
import { UserAddressList } from '../Lists/UserAddressList';

export const UserAddressContainer = ({ user_id }) => {
    const [data, setData] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const navigation = useNavigation();

    const handleDelete = (address_id) => {
        http.delete(`users/${user_id}/addresses/${address_id}`)
        .then(() => {
            setCount(count - 1);
        }).catch(error => {
            showMessage({
                message: error.message,
                type: "danger"
            });
        })
    }

    const onPress = (address) => {
        navigation.push('Home', { data: address});
    }

    useEffect(() => {
        http.get(`users/${user_id}/addresses`)
        .then(res => {
            if (res.data) {
                setData(res.data);
                setCount(res.data.length)
            }

        }).catch(error => {
            showMessage({
                message: error.message,
                type: "danger"
            });
        })
    }, [count]);

    return (
        <UserAddressList 
            data={data} 
            onPress={onPress} 
            handleDelete={handleDelete}
        />
    )
}