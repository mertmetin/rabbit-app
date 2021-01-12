import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";
import { UserAddressList } from '../Lists/UserAddressList';

export const UserAddressContainer = props => {
    const user_id = props.user_id;
    const [data, setData] = React.useState([]);
    const navigation = useNavigation();

    const onPress = (address_id) => {
        http.delete(`users/${user_id}/addresses/${address_id}`)
        .then(
            navigation.push('AddressScreen', { data: user_id })
        ).catch(error => {
            showMessage({
                message: error.message,
                type: "success"
            });
        })
    }

    React.useEffect(() => {
        http.get(`users/${user_id}/addresses`)
        .then(res => {
            if (res.data)
                setData(res.data);

        }).catch(error => {
            showMessage({
                message: error.message,
                type: "danger"
            });
        })
    }, []);


    return (
        <UserAddressList data={data} onPress={onPress} />
    )
}