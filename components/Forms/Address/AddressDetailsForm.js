import React, { Component } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { validate } from 'validate.js/validate';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Container, Header, Text, Content, Form, Item, Input, Label, Icon, View } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import { GooglePlaces } from '../../GooglePlaces';
import constraints from '../../../constants/Constraints';
import http from '../../../helpers/Http';

export function AddressDetailsForm(props) {
    const userId = props.userId;
    const [address, setAddress] = React.useState(props.address);
    const [errors, setErrors] = React.useState([]);
    const navigation = useNavigation();

    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = parseFloat(0.0922);
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO / 2;

    const lat = parseFloat(address.lat);
    const lng = parseFloat(address.lng);

    var region = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
    }

    return (
        <SafeAreaView>
            <MapView
                initialRegion={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }}
                region={region}
                style={styles.map}>
                <MapView.Marker
                    coordinate={{
                        latitude: lat,
                        longitude: lng
                    }}
                />
            </MapView>
            <ActionButton style={styles.button} title={'Use this address'} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: 475
    },
    button: {
        paddingTop: 10
    },
    text: {
        color: '#00754a',
        fontSize: 16,
        fontFamily: 'sodo-sans-semibold',
        paddingTop: 10,
        paddingBottom: 10
    }
});
