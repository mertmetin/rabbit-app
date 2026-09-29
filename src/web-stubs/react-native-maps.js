// Browser stand-in for react-native-maps, which only runs on iOS/Android.
import * as React from 'react';
import { View, Text } from 'react-native';

export const PROVIDER_GOOGLE = 'google';
export const Marker = () => null;
export const Polyline = () => null;

export default function MapView({ style, children }) {
    return (
        <View style={[{ backgroundColor: '#e8efe9', alignItems: 'center', justifyContent: 'center', minHeight: 120 }, style]}>
            <Text style={{ color: '#617062' }}>Map (shown on phone only)</Text>
        </View>
    );
}
