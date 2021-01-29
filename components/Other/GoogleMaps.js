import React, { Component, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

function GoogleMaps(props) {
    const [region, setRegion] = useState(
        {
            longitude: 0,
            latitude: 0,
            longitudeDelta: 0.004,
            latitudeDelta: 0.009
        });
    const [markers, setMarkers] = useState([]);

    const onRegionChange = (region) => {
        setRegion(region);
    }

    return <MapView
        region={region}
        onRegionChange={onRegionChange}
        initialRegion={{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}>
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                />
            ))}
        </MapView>
}

export default GoogleMaps;