import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useGpsLocation } from '@/hooks';
import { Navigate } from '@/icons';

export const LocationFinder = ({ submitHandler }) => {
    const [location, setLocation] = React.useState([]);
    const { status, gpsLocation } = useGpsLocation();

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

    const submitHandler = () => {
        var coords = gpsLocation.coords;
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
    }

    return <LocationFinderButton submitHandler={submitHandler} />
}