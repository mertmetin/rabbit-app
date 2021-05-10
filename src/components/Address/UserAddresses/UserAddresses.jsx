import React, { Component, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";
import { UserAddressesList } from './UserAddressesList';

export const UserAddresses = ({ user_id }) => {
    const [data, setData] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const navigation = useNavigation();

    const deleteHandler = (address_id) => {
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

    const submitHandler = (address) => navigation.push('Home', { data: address});

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
        <UserAddressesList 
            data={data} 
            submitHandler={submitHandler} 
            deleteHandler={deleteHandler}
        />
    )
}