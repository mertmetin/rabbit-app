import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ListItem, Button, Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import http from '../../helpers/Http';
import { getCurrentUser } from '../../helpers/Auth';
import { DEFAULT_LOCATION } from '@/config';
import { Map } from '../Maps';
import { NoServiceCard } from '../Cards/NoServiceCard';
import { CategoriesCards } from '../Cards/CategoriesCards';

const LOCATION_TIMEOUT_MS = 8000;

// Device location, or downtown Ottawa if it's unavailable or not allowed.
async function currentLocation() {
    const fallback = { ...DEFAULT_LOCATION, label: 'Downtown Ottawa' };
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted')
            return fallback;

        const position = await Promise.race([
            Location.getCurrentPositionAsync({}),
            new Promise((resolve) => setTimeout(() => resolve(null), LOCATION_TIMEOUT_MS)),
        ]);
        if (!position)
            return fallback;

        return { latitude: position.coords.latitude, longitude: position.coords.longitude, label: 'Current location' };
    } catch {
        return fallback;
    }
}

// Home screen body: where we deliver to, the store serving it, and its aisles.
export const DeliveryAddressContainer = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const address = useSelector((state) => state.deliveryAddress.address);
    const { store, checked } = useSelector((state) => state.store);
    const [place, setPlace] = useState(null);
    const [error, setError] = useState(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let cancelled = false;
        dispatch({ type: 'RESET_STORE' });
        setError(null);

        (async () => {
            const found = address
                ? { latitude: Number(address.latitude), longitude: Number(address.longitude), label: address.label || address.address_line_1 }
                : await currentLocation();
            if (cancelled)
                return;
            setPlace(found);

            try {
                const res = await http.get('stores/closest', { params: { lat: found.latitude, lng: found.longitude } });
                if (!cancelled)
                    dispatch({ type: 'SET_STORE', payload: res.data });
            } catch (err) {
                if (!cancelled)
                    setError(err.message);
            }
        })();

        return () => { cancelled = true; };
    }, [address, attempt]);

    const chooseAddress = async () => {
        const user = await getCurrentUser();
        if (user) {
            navigation.navigate('ChooseAddress', { id: user.id });
            return;
        }
        showMessage({ message: 'Sign in to save delivery addresses.', type: 'info' });
        navigation.navigate('Profile');
    };

    const browseDowntown = () =>
        dispatch({ type: 'SET_DELIVERY_ADDRESS', payload: { ...DEFAULT_LOCATION, label: 'Downtown Ottawa' } });

    let body;
    if (error) {
        body = (
            <View style={styles.message}>
                <Text>Can't reach Rabbit right now.</Text>
                <Text appearance='hint' style={styles.hint}>{error}</Text>
                <Button size='small' onPress={() => setAttempt(attempt + 1)}>Try again</Button>
            </View>
        );
    } else if (!checked) {
        body = <ActivityIndicator style={styles.message} />;
    } else if (store) {
        body = <CategoriesCards storeId={store.id} />;
    } else {
        body = (
            <View style={[styles.box_shadow, styles.noService]}>
                <NoServiceCard />
                <Button appearance='ghost' onPress={browseDowntown}>Browse downtown Ottawa instead</Button>
            </View>
        );
    }

    return (
        <View>
            <View style={[styles.box_shadow, { zIndex: 100 }]}>
                <ListItem
                    title={place ? `Deliver to: ${place.label}` : 'Finding your location…'}
                    description={store ? `From ${store.name} · ${store.distance_km} km away` : undefined}
                    accessoryRight={() => <Ionicons size={24} name='chevron-forward' />}
                    onPress={chooseAddress}
                />
            </View>
            <View style={styles.map}>
                {place && <Map initialRegion={{ latitude: place.latitude, longitude: place.longitude }} />}
            </View>
            {body}
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        height: 200
    },
    message: {
        padding: 24,
        alignItems: 'center',
        gap: 8
    },
    hint: {
        textAlign: 'center'
    },
    noService: {
        padding: 10,
        backgroundColor: '#fff'
    },
    box_shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    }
});
