import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";
import { AddUserAddressList } from '../Lists/AddUserAddressList';

export const AddUserAddressContainer = props => {
    const onPress = () => {

    }

    return (
        <AddUserAddressList onPress={onPress} />
    )
}

