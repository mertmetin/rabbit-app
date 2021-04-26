import axios from 'axios';
import React, { useState } from 'react';
import http from '../../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";

import { PlaceAutocomplete } from '@/components/PlaceAutocomplete';
import { LocationFinder } from '@/components/LocationFinder';
import { Map } from '@/components/Maps';
import { Modal } from '@/components/Modal';
import { AddressForm } from './AddressForm';

import { Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const AddUserAddress = ({ data }) => {
    const navigation = useNavigation();

    const [ address, setAddress ] = useState(null);
    const [ position, setPosition ] = useState({});
    const [ showConfirmModal, setShowConfirmModal ] = useState(false);
    const [ showAddressForm, setShowAddressForm ] = useState(false);

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

    const onAddressSelected = (item) => {
        const url = 'https://maps.googleapis.com/maps/api/place/details/json?' +
            'key=***REMOVED***&' +
            '&input=bar' +
            '&placeid=' + item.place_id;
    
        axios.get(url).then(result => {
            var data = result.data;
            var result = data.result;
            var address_components = result.address_components;
            var geometry = result.geometry;
            var location = geometry.location;
            var address = parseAddressComponents(address_components);
            address.latitude = location.lat;
            address.longitude = location.lng;
            setAddress(address);
        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }

    const handleSubmit = () => setShowAddressForm(true);

    const addAddress = (location) => {
        var user_id = data.user_id;
        location.user_id = user_id;

        console.log(location);

        http.post(`users/${user_id}/addresses`, {address: location})
        .then(result => {
            navigation.navigate('Home');
        }).catch(error => {
            console.log(error);
            showMessage({
                message: error.message,
                type: "danger"
            });
        })
    }

    console.log(showAddressForm);

    return (
        <>
            {!address ? 
                <>
                    <PlaceAutocomplete onAddressSelected={onAddressSelected} />
                    <LocationFinder setPosition={setPosition} /> 
                </> :
                <>
                    <Map initialRegion={address} />
                    {showConfirmModal && 
                        <Modal visible={showConfirmModal} setVisible={setShowConfirmModal} handleSubmit={handleSubmit}
                            title={'Your order will be delivered to the pinned location on the map. Please confirm your pinned location.'} />
                    }
                    <View style={styles.container}>
                        {showAddressForm ? <AddressForm address={address} type={data.type} addAddress={addAddress} /> : 
                            <Button onPress={() => setShowConfirmModal(true)} style={styles.btnAddressSelect}>Use this address</Button>
                        }
                    </View>          

                </>
            }
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        backgroundColor: '#fff',
        shadowOpacity: 0.05,
        shadowRadius: 1.84,
    },
    btnAddressSelect: {
        margin: 20
    },
});