import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0291;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = '***REMOVED***';

export const Map = ({ initialRegion, markerIcon }) =>  {
    return (
        <MapView
            scrollEnabled={false}
            provider={PROVIDER_GOOGLE} 
            style={styles.map}
            initialRegion={{
                ...initialRegion,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}
            region={{...initialRegion}}
        >
            <Marker coordinate={{...initialRegion} }>{markerIcon && markerIcon}</Marker> 
        </MapView >
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%'
    }
});

