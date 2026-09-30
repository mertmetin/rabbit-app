import * as React from 'react';
import { ActivityIndicator, ActionSheetIOS, Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import http from '../../../helpers/Http';
import { goHome } from '../../../helpers/Navigation';
import { theme } from '../../../theme';

export const ADDRESS_ICONS = { home: 'home', work: 'briefcase', other: 'location' };

// Saved addresses: tap one to deliver there, ⋯ to edit or delete, or add one.
// Also used as the "Choose a delivery address" screen from Home and checkout.
export default function AddressScreen({ navigation, route }) {
    const userId = route.params?.id;
    const returnTo = route.params?.returnTo;
    const dispatch = useDispatch();
    const selected = useSelector((state) => state.deliveryAddress.address);
    const [addresses, setAddresses] = React.useState(null);

    const load = React.useCallback(() => {
        http.get(`users/${userId}/addresses`)
            .then((res) => setAddresses(res.data))
            .catch((error) => {
                setAddresses([]);
                showMessage({ message: error.message, type: 'danger' });
            });
    }, [userId]);

    useFocusEffect(load);

    const done = () => (returnTo ? navigation.navigate(returnTo) : goHome(navigation));

    const choose = (address) => {
        dispatch({ type: 'SET_DELIVERY_ADDRESS', payload: address });
        done();
    };

    const useCurrentLocation = () => {
        dispatch({ type: 'REMOVE_DELIVERY_ADDRESS' });
        done();
    };

    const edit = (address) => navigation.navigate('AddAddressScreen', { data: { user_id: userId, address, returnTo } });
    const add = () => navigation.navigate('AddAddressScreen', { data: { user_id: userId, type: 'home', returnTo } });

    const remove = (address) => Alert.alert(`Delete "${address.label || address.address_line_1}"?`, undefined, [
        { text: 'Cancel', style: 'cancel' },
        {
            text: 'Delete', style: 'destructive', onPress: () =>
                http.delete(`users/${userId}/addresses/${address.id}`)
                    .then(() => {
                        if (selected?.id === address.id) dispatch({ type: 'REMOVE_DELIVERY_ADDRESS' });
                        load();
                    })
                    .catch((error) => showMessage({ message: error.message, type: 'danger' })),
        },
    ]);

    const more = (address) => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                { options: ['Edit', 'Delete', 'Cancel'], destructiveButtonIndex: 1, cancelButtonIndex: 2 },
                (i) => (i === 0 ? edit(address) : i === 1 ? remove(address) : null),
            );
        } else {
            Alert.alert(address.label || address.address_line_1, undefined, [
                { text: 'Edit', onPress: () => edit(address) },
                { text: 'Delete', style: 'destructive', onPress: () => remove(address) },
                { text: 'Cancel', style: 'cancel' },
            ]);
        }
    };

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content}>
                <Pressable style={[styles.card, styles.row]} onPress={useCurrentLocation}>
                    <View style={[styles.icon, styles.iconLocation]}>
                        <Ionicons name="navigate" size={20} color={theme.primary} />
                    </View>
                    <View style={styles.text}>
                        <Text style={styles.label}>Use my current location</Text>
                        <Text style={styles.line}>Find the nearest store automatically</Text>
                    </View>
                    {!selected && <Ionicons name="checkmark-circle" size={24} color={theme.primary} />}
                </Pressable>

                <Text style={styles.section}>Saved addresses</Text>

                {addresses === null ? (
                    <ActivityIndicator style={{ marginTop: 20 }} />
                ) : addresses.length === 0 ? (
                    <View style={[styles.card, styles.empty]}>
                        <Ionicons name="map-outline" size={36} color={theme.muted} />
                        <Text style={styles.emptyText}>No saved addresses yet. Add your home or work to check out faster.</Text>
                    </View>
                ) : (
                    <View style={styles.card}>
                        {addresses.map((address, i) => {
                            const isSelected = selected?.id === address.id;
                            return (
                                <Pressable key={address.id} onPress={() => choose(address)}
                                    style={[styles.row, i < addresses.length - 1 && styles.divider]}>
                                    <View style={[styles.icon, isSelected && styles.iconSelected]}>
                                        <Ionicons name={ADDRESS_ICONS[address.icon] || 'location'} size={20}
                                            color={isSelected ? theme.white : theme.primary} />
                                    </View>
                                    <View style={styles.text}>
                                        <Text style={styles.label} numberOfLines={1}>
                                            {address.label || address.icon.charAt(0).toUpperCase() + address.icon.slice(1)}
                                        </Text>
                                        <Text style={styles.line} numberOfLines={1}>{address.address_line_1}</Text>
                                        <Text style={styles.sub} numberOfLines={1}>
                                            {[address.address_line_2, address.city, address.postal_code].filter(Boolean).join(', ')}
                                        </Text>
                                    </View>
                                    {isSelected && <Ionicons name="checkmark-circle" size={24} color={theme.primary} />}
                                    <Pressable onPress={() => more(address)} hitSlop={12} style={styles.more}>
                                        <Ionicons name="ellipsis-horizontal" size={22} color={theme.muted} />
                                    </Pressable>
                                </Pressable>
                            );
                        })}
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <Pressable style={styles.addButton} onPress={add}>
                    <Ionicons name="add" size={22} color={theme.white} />
                    <Text style={styles.addText}>Add new address</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.background },
    content: { padding: 16, paddingBottom: 24 },
    card: { backgroundColor: theme.white, borderRadius: 16, paddingHorizontal: 14 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 },
    divider: { borderBottomWidth: 1, borderBottomColor: theme.border },
    icon: { width: 42, height: 42, borderRadius: 21, backgroundColor: theme.primarySoft, alignItems: 'center', justifyContent: 'center' },
    iconSelected: { backgroundColor: theme.primary },
    iconLocation: { backgroundColor: '#fff6dc' },
    text: { flex: 1 },
    label: { color: theme.text, fontFamily: theme.font.bold, fontSize: 16 },
    line: { marginTop: 2, color: theme.text, fontFamily: theme.font.regular, fontSize: 14 },
    sub: { marginTop: 1, color: theme.muted, fontFamily: theme.font.regular, fontSize: 13 },
    more: { paddingLeft: 4 },
    section: { marginTop: 22, marginBottom: 10, marginLeft: 4, color: theme.muted, fontFamily: theme.font.bold, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 },
    empty: { alignItems: 'center', gap: 10, paddingVertical: 28 },
    emptyText: { textAlign: 'center', color: theme.muted, fontFamily: theme.font.regular, fontSize: 15, paddingHorizontal: 12 },
    footer: { padding: 16, paddingBottom: 30, backgroundColor: theme.white, borderTopWidth: 1, borderTopColor: theme.border },
    addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, height: 54, borderRadius: 14, backgroundColor: theme.primary },
    addText: { color: theme.white, fontFamily: theme.font.bold, fontSize: 17 },
});
