import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

function Map(props) {
    var initialRegion = props.initialRegion;
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO / 4;
    const currentCoordinates = {
        latitude: 45.415355,
        longitude: -75.670803
    }

    if (!initialRegion.latitude || !initialRegion.longitude)
    {
        initialRegion.latitude = currentCoordinates.latitude;
        initialRegion.longitude = currentCoordinates.longitude;
    }

    initialRegion.latitudeDelta = LATITUDE_DELTA;
    initialRegion.longitudeDelta = LONGITUDE_DELTA;

    console.log(initialRegion);

    var region = {
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    }

    var markerCoords;

    if (props.marker)
    {
        const marker = props.marker;

        if (marker.latitude && marker.longitude)
        {
            markerCoords = {
                latitude: parseFloat(marker.latitude),
                longitude: parseFloat(marker.longitude),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        }
    }

    return (
        <MapView
            initialRegion={initialRegion}
            provider={PROVIDER_GOOGLE}
            region={region}
            style={ styles.map }>
            {markerCoords &&
                <MapView.Marker coordinate={markerCoords} />
            }
        </MapView>
    );

}

const styles = StyleSheet.create({
    map: {
        height: 250
    }
});

export default Map;