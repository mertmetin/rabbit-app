import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import { theme } from '../../theme';
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

    // Delivery time for the header, re-estimated as the basket changes (the
    // server counts different products; an empty basket means a typical one).
    const cart = useCart();
    const products = Object.keys(cart.items).length;
    const [eta, setEta] = useState(null);
    useEffect(() => {
        if (!store || !place)
            return setEta(null);
        let cancelled = false;
        const timer = setTimeout(() => {
            http.get('stores/closest', { params: { lat: place.latitude, lng: place.longitude, products } })
                .then((res) => !cancelled && setEta(res.data?.open ? res.data : null))
                .catch(() => {});
        }, 400);
        return () => { cancelled = true; clearTimeout(timer); };
    }, [store?.id, place, products]);

    const chooseAddress = async () => {
        const user = await getCurrentUser();
        if (user) {
            navigation.navigate('ChooseAddress', { id: user.id });
            return;
        }
        navigation.navigate('Root', { screen: 'Profile', params: { screen: 'SignIn' } });
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
        body = <NoServiceCard onChangeAddress={chooseAddress} onBrowse={browseDowntown} />;
    }

    return (
        <View>
            <View style={[styles.box_shadow, styles.header]}>
                <Pressable style={styles.addressButton} onPress={chooseAddress}>
                    <RNText style={styles.deliverTo}>Deliver to</RNText>
                    <View style={styles.addressRow}>
                        <RNText style={styles.addressText} numberOfLines={1}>{place ? place.label : 'Finding your location…'}</RNText>
                        <Ionicons size={18} name='chevron-down' color={theme.primary} />
                    </View>
                    {eta?.farther && (
                        <RNText style={styles.farther} numberOfLines={2}>From our {eta.name} branch today, a little farther away</RNText>
                    )}
                </Pressable>
                {/* Delivery time, not distance: the store may be the shopper's home. */}
                {store && store.open === false && !eta && (
                    <View style={[styles.eta, styles.etaOff]}>
                        <Ionicons name='moon' size={20} color={theme.muted} />
                        <View>
                            <RNText style={[styles.etaLabel, styles.etaOffText]}>Delivery</RNText>
                            <RNText style={[styles.etaTime, styles.etaOffText, { fontSize: 15 }]}>Closed right now</RNText>
                        </View>
                    </View>
                )}
                {checked && !store && !error && (
                    <View style={[styles.eta, styles.etaOff]}>
                        <Ionicons name='close-circle' size={22} color={theme.muted} />
                        <View>
                            <RNText style={[styles.etaLabel, styles.etaOffText]}>Delivery</RNText>
                            <RNText style={[styles.etaTime, styles.etaOffText, { fontSize: 15 }]}>Not here yet</RNText>
                        </View>
                    </View>
                )}
                {eta && (
                    <View style={styles.eta}>
                        <Ionicons name='time' size={24} color={theme.primary} />
                        <View>
                            <RNText style={styles.etaLabel}>Delivery</RNText>
                            <RNText style={styles.etaTime}>{eta.eta_min}–{eta.eta_max} min</RNText>
                        </View>
                    </View>
                )}
            </View>
            <View style={styles.map}>
                {place && <Map initialRegion={{ latitude: place.latitude, longitude: place.longitude }} />}
            </View>
            {body}
        </View>
    );
}

const styles = StyleSheet.create({
    header: { zIndex: 100, flexDirection: 'row', alignItems: 'stretch', backgroundColor: theme.white, minHeight: 68 },
    addressButton: { flex: 1, justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 10 },
    deliverTo: { color: theme.muted, fontFamily: theme.font.semibold, fontSize: 12 },
    addressRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
    addressText: { flexShrink: 1, color: theme.text, fontFamily: theme.font.bold, fontSize: 16 },
    eta: {
        flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16,
        backgroundColor: theme.accent, borderTopLeftRadius: 22, borderBottomLeftRadius: 22,
    },
    farther: { color: theme.muted, fontFamily: theme.font.regular, fontSize: 12, marginTop: 2 },
    etaOff: { backgroundColor: theme.border },
    etaOffText: { color: theme.muted },
    etaLabel: { color: theme.primary, fontFamily: theme.font.semibold, fontSize: 13 },
    etaTime: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 20 },
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
