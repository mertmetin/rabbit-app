import React, { Component } from 'react';
import AddressPickerButton from '../Buttons/AddressPickerButton';
import Map from './Map';
import { View, Text } from 'react-native';
import http from '../../helpers/Http';


function DeliveryMap(props) {
    // const userId = props.userId;
    const [store, setStore] = React.useState({});
    const address = props.address;

    // http.post('getStore', { address: address }).then((response) => {

    //     if (response.data) {
    //       var data = response.data;
    //         setStore(data);

    //     } else {
    //         setStore(false);
    //     }
    // });

    console.log(address);

    // http.post('getStore', { address: address }).then((response) => {

    //     if (response.data) {
    //         var data = response.data;
    //         setStore(data);
    //         // setBool(true);

    //     } else {
    //         setStore(false);
    //         // setBool(false);
    //     }

    // });
    // var addressData;
    // var marker;

    // if (deliveryAddress) {
    //     var key = Object.keys(deliveryAddress)[0];
    //     var addressData = deliveryAddress[key];

    //     marker = {
    //         latitude: addressData.lat,
    //         longitude: addressData.lng
    //     }
    // }

    return(
        <View>
            {/* <Map /> */}
            {/* <AddressPickerButton userId={userId} address={addressData} /> */}
        </View>
    );
}

export default DeliveryMap;