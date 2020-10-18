import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
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

    if (!initialRegion.lat || !initialRegion.lng)
    {
        initialRegion.lat = parseFloat(currentCoordinates.latitude);
        initialRegion.lng = parseFloat(currentCoordinates.longitude);
    }

    var region = {
        latitude: initialRegion.lat,
        longitude: initialRegion.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    }

    var markerCoords;

    if (props.marker)
    {
        const marker = props.marker;

        if (marker.lng && marker.lat)
        {
            markerCoords = {
                latitude: parseFloat(marker.lat),
                longitude: parseFloat(marker.lng),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        }
    }

    return (
        <MapView
            initialRegion={{
                latitude: parseFloat(initialRegion.lat),
                longitude: parseFloat(initialRegion.lng),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}
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