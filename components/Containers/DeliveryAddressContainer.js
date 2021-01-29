import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import  Map from '../Other/Map';
import MapDirections from '../Maps/MapDirections';
import GoogleMaps from '../Other/GoogleMaps';
import { View} from 'react-native';
import {showMessage, hideMessage } from "react-native-flash-message";
import {NoServiceCard} from '../Cards/NoServiceCard';
import { StyleSheet } from 'react-native';
import { ListItem } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

export const DeliveryAddressContainer = props => {
    const [location, setLocation] = useState(props.deliveryAddress);
    const [cards, setCards] = useState(null);
    const [map, setMap] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const deliveryAddress = props.deliveryAddress;
    const navigation = useNavigation();
    var user_id = 1;

    const renderItemAccessory = (payment_method_id) => (
        <Ionicons size={24} name='chevron-forward' />
    );

    const fetchLocation = () => {
        (async () => {

            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let coords = location.coords;
            let region = await Location.
                reverseGeocodeAsync({ longitude: coords.longitude, latitude: coords.latitude });

            setLocation({ latitude: coords.latitude, longitude: coords.longitude, city: region[0]['city']});
        })();
    }

    useEffect(() => {
       

        // if (!location) {
        //     fetchLocation();
        //     return;
        // }

        // var city = location.city;

        // http.get('cities')
        // .then(result => {
        //     var data = result.data;

        //     if (data.includes(city)) {
        //         var lat = location.latitude;
        //         var lng = location.longitude;
        //         http.get(`stores/closest?lat=${lat}&lng=${lng}`)
        //             .then(result => {
        //                 var data = result.data;
        //                 setMap(<Map marker={coords} />)
        //             })
        //             .catch()
        //     } else {
        //         // setMap(<Map marker={location} />)
        //         setCards(<View style={[styles.box_shadow, { padding: 10 }]}><NoServiceCard /></View>)
        //     }
        // }).catch(error => {
        //     showMessage({
        //         message: error.message,
        //         type: "danger"
        //     });
        // })

    });

    const origin = { latitude: 45.424721, longitude: -75.695000 };
    const destination = { latitude: 45.4153548, longitude: -75.6708025 };

    return (
        <View>
            <View>
                <View style={[styles.box_shadow, {zIndex: 100}]}>
                    <ListItem
                        key={"btn-choose-delivery-address"}
                        title={'Choose a delivery address'}
                        accessoryRight={renderItemAccessory}
                    // accessoryLeft={NavigateIcon}
                        onPress={() => {
                            navigation.navigate('ChooseAddress', {id: user_id});
                        }}
                    />
                </View>
                <View style={{ height: 300 }}>
                    <MapDirections origin={origin} destination={destination} />

                    {/* <GoogleMaps /> */}
                    {/* { location && <Map marker={location} /> } */}
                    {/* {map} */}
                </View>
            </View>
            <View>
                {cards}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box_shadow: {
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    }
});
