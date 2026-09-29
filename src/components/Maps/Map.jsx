import React from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const LATITUDE_DELTA = 0.0291;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

// Google Maps on Android; Apple Maps on iOS (works in Expo Go without a key).
export const Map = ({ initialRegion, markerIcon }) => {
    const region = { ...initialRegion, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA };

    return (
        <MapView
            scrollEnabled={false}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            style={styles.map}
            region={region}
        >
            <Marker coordinate={initialRegion}>{markerIcon}</Marker>
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        height: '100%'
    }
});
