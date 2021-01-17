import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import  Map from '../Other/Map';
import { showMessage, hideMessage } from "react-native-flash-message";

export const DeliveryAddressContainer = props => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);

    console.log(location);

    return (
        location && <Map marker={location} /> 
    )
}