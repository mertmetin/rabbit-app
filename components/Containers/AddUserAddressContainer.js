import axios from 'axios';
import React, { Component } from 'react';
import { PlaceSearchForm } from '../Forms/Address/PlaceSearchForm';
import { AddressSelectForm } from '../Forms/Address/AddressSelectForm';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";
import { AddressPredictionsList } from '../Lists/AddressPredictionsList';
import * as Location from 'expo-location';

export const AddUserAddressContainer = props => {
    const data = props.data;
    // const user_id = data.user_id;
    // const type = data.type;
    const navigation = useNavigation();
    const [location, setLocation] = React.useState([]);
    const [predictions, setPredictions] = React.useState([]);
    const [currentLocation, setCurrentLocation] = React.useState(null);

    const onPress = () => {
        navigation.push('AddAddressScreen', { data: data});
    }   

    const parseAddressComponents = (address_components) => {
        var address = {};

        for (var item of address_components)
        {
            if (item.types.includes('street_number'))
                address.address_line_1 = item.short_name;

            if (item.types.includes('route'))
                address.address_line_1 += ' ' + item.short_name;

            if (item.types.includes('subpremise'))
                address.address_line_2 =  item.short_name;

            if (item.types.includes('administrative_area_level_1'))
                address.zone_code = item.short_name;

            if (item.types.includes('postal_code'))
                address.postal_code = item.long_name;

            if (item.types.includes('locality'))
                address.city = item.short_name;

            if (item.types.includes('country'))
                address.country_code = item.short_name;

        }

        return address;
    }

    const onAddressSelected = (data) => {
        const url = 'https://maps.googleapis.com/maps/api/place/details/json?' +
            'key=***REMOVED***&' +
            '&input=bar' +
            '&placeid=' + data.place_id;

        axios.get(url).then(result => {
            var data = result.data;
            var result = data.result;
            var address_components = result.address_components;
            var geometry = result.geometry;
            var location = geometry.location;
            var address = parseAddressComponents(address_components);
            address.latitude = location.lat;
            address.longitude = location.lng;
            setLocation(address);
        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }

    const addAddress = (location) => {
        var user_id = data.user_id;
        location.user_id = user_id;

        http.post(`users/${user_id}/addresses`, {address: location})
        .then(result => {
            navigation.navigate('Home');
            if (res.data)
                setData(res.data);
        }).catch(error => {
            showMessage({
                message: error.message,
                type: "danger"
            });
        })
    }

    const onTextChange = (data) => {
        const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?' +
            'key=***REMOVED***&' +
            '&input=' + data +
            '&inputtype=textquery' +
            '&fields=formatted_address,name,rating,opening_hours'; 

        axios.get(url).then(result => {
            setPredictions(result.data.predictions)
        }).catch(error => {
            showMessage({
                message: error.message,
                type: "danger"
            });
        })
    }

    const findCurrentLocation = () => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            var coords = location.coords;
            const url = 'https://maps.googleapis.com/maps/api/geocode/json?' +
                'key=***REMOVED***&' +
                '&latlng=' + coords.latitude + ',' + coords.longitude;

            axios.get(url).then(result => {
                var address = parseAddressComponents(result.data.results[0].address_components);
                address.latitude = coords.latitude;
                address.longitude = coords.longitude;
                setLocation(address);
            }).catch(error => {
                showMessage({
                    message: error.message,
                    type: "danger"
                });
            })
        })();
    }
    
    var markup;

    if (location.latitude)
    {
        location.type = data.type;
        markup = <AddressSelectForm style={{ position: 'relative' }}
         onPress={addAddress} location={location} />;
    }
    else {
        markup = <React.Fragment>
            <PlaceSearchForm onPress={findCurrentLocation} onTextChange={onTextChange} />
            <AddressPredictionsList predictions={predictions} onPress={onAddressSelected} />
        </React.Fragment>;
    }

    return (
        <React.Fragment>
            {markup}
        </React.Fragment>
    )
}

