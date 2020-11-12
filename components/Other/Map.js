import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
// import Geolocation from '@react-native-community/geolocation';

function Map(props) {
    var marker = props.marker;
    var region = props.region;
    var destination = props.destination;
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0401;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO / 2;
    var mapMarkers = [];
    var mapViewDirections = null;
 
    if (!region) 
        region = marker;
   
    region.latitudeDelta = LATITUDE_DELTA;
    region.longitudeDelta = LONGITUDE_DELTA;

    if (marker) 
        mapMarkers.push(<MapView.Marker coordinate={marker} />);

    if (destination)
    {
        mapMarkers.push(<MapView.Marker coordinate={destination} />);
        mapViewDirections = (
            <MapViewDirections
                origin={marker}
                destination={destination}
                apikey={'***REMOVED***'}
                strokeWidth={3}
                strokeColor="#00754a"
                onReady={result => { }}
            />
        )
    }

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            region={region}
            style={ styles.map }
            scrollEnabled={false}>
            {mapMarkers}
            {mapViewDirections}

        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        height: 250
    }
});

export default Map;