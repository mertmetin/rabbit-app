import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0291;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = '***REMOVED***';

function MapDirections(props) {
    return (
        <MapView
            scrollEnabled={false}
            provider={PROVIDER_GOOGLE} 
            style={styles.map}
            initialRegion={{
                latitude: props.origin.latitude,
                longitude: props.origin.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}>
            <MapView.Marker coordinate={props.origin} />
            <MapView.Marker coordinate={props.destination} />
            <MapViewDirections
                origin={props.origin}
                destination={props.destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="#00754a"
            />
        </MapView >
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%'
    }
});


export default MapDirections;