import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text as RNText, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../theme';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Button, Input, Text } from '@ui-kitten/components';
import { showMessage } from 'react-native-flash-message';
import http from '../../../helpers/Http';
import { goHome } from '../../../helpers/Navigation';
import { addressSearchAvailable, resolveAddress, searchAddresses } from '../../../../modules/address-search/src';

const POSTAL_CODE = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;

// The street field suggests addresses as you type (Apple Maps); picking one
// fills in the rest. Fields also carry iOS AutoFill types, so the keyboard
// offers the customer's own saved addresses.
// Turns a typed address into map coordinates with the phone's own geocoder
// (Apple Maps on iOS), so no Google key is needed.
async function locate(address) {
    const query = [address.address_line_1, address.city, address.zone_code, address.postal_code, 'Canada']
        .filter(Boolean).join(', ');
    const results = await Location.geocodeAsync(query);
    return results[0] || null;
}

const TYPES = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'work', label: 'Work', icon: 'briefcase' },
    { key: 'other', label: 'Other', icon: 'location' },
];

// Add or edit a delivery address: typed in, located on the map, saved to the
// account, then used as the delivery address. `data.address` means editing.
export const AddUserAddress = ({ data }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const existing = data.address;
    const [type, setType] = useState(existing?.icon || data.type || 'home');
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        label: existing?.label ?? '',
        address_line_1: existing?.address_line_1 ?? '',
        address_line_2: existing?.address_line_2 ?? '',
        city: existing?.city ?? 'Ottawa',
        zone_code: existing?.zone_code ?? 'ON',
        postal_code: existing?.postal_code ?? '',
        notes: existing?.notes ?? '',
    });

    // Suggestions while typing the street; `picked` is the map point of a
    // chosen suggestion (typing again drops it and we geocode on save).
    const [suggestions, setSuggestions] = useState([]);
    const [picked, setPicked] = useState(null);
    const typed = useRef(false);

    const set = (field) => (value) => {
        if (field === 'address_line_1') {
            typed.current = true;
            setPicked(null);
        }
        setForm({ ...form, [field]: value });
    };

    useEffect(() => {
        if (!addressSearchAvailable || !typed.current)
            return;
        const timer = setTimeout(() => {
            searchAddresses(form.address_line_1).then(setSuggestions).catch(() => setSuggestions([]));
        }, 250);
        return () => clearTimeout(timer);
    }, [form.address_line_1]);

    const choose = async (suggestion) => {
        typed.current = false;
        setSuggestions([]);
        try {
            const place = await resolveAddress(suggestion);
            setForm((f) => ({
                ...f,
                address_line_1: place.address_line_1,
                city: place.city || f.city,
                zone_code: place.zone_code || f.zone_code,
                postal_code: place.postal_code || f.postal_code,
            }));
            setPicked({ latitude: place.latitude, longitude: place.longitude });
        } catch {
            setForm((f) => ({ ...f, address_line_1: suggestion.title }));
        }
    };

    const save = async () => {
        if (!form.address_line_1.trim() || !form.city.trim())
            return showMessage({ message: 'Enter a street address and city.', type: 'warning' });
        if (form.postal_code && !POSTAL_CODE.test(form.postal_code.trim()))
            return showMessage({ message: 'That postal code looks wrong (e.g. K1P 1J1).', type: 'warning' });

        setSaving(true);
        try {
            const point = picked ?? await locate(form);
            if (!point) {
                showMessage({ message: "We couldn't find that address on the map.", type: 'warning' });
                return;
            }

            const label = form.label.trim() || TYPES.find((t) => t.key === type).label;
            const address = { ...form, label, address_type: type, latitude: point.latitude, longitude: point.longitude };
            const res = existing
                ? await http.put(`users/${data.user_id}/addresses/${existing.id}`, { address })
                : await http.post(`users/${data.user_id}/addresses`, { address });

            dispatch({ type: 'SET_DELIVERY_ADDRESS', payload: res.data });
            showMessage({ message: existing ? 'Address updated.' : 'Address saved.', type: 'success' });
            data.returnTo ? navigation.navigate(data.returnTo) : goHome(navigation);
        } catch (error) {
            showMessage({ message: error.message, type: 'danger' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
            <View style={styles.types}>
                {TYPES.map((t) => (
                    <Pressable key={t.key} onPress={() => setType(t.key)} style={[styles.type, type === t.key && styles.typeOn]}>
                        <Ionicons name={t.icon} size={18} color={type === t.key ? theme.white : theme.primary} />
                        <RNText style={[styles.typeText, type === t.key && styles.typeTextOn]}>{t.label}</RNText>
                    </Pressable>
                ))}
            </View>
            <Input label='Name (optional)' placeholder={TYPES.find((t) => t.key === type).label + ', Mom\'s place, Cottage…'}
                value={form.label} onChangeText={set('label')} style={styles.field} />
            <Input label='Street address' placeholder='110 Laurier Ave W' value={form.address_line_1}
                onChangeText={set('address_line_1')} style={styles.field} autoFocus={!existing}
                textContentType='streetAddressLine1' autoComplete='address-line1' />
            {suggestions.length > 0 && (
                <View style={styles.suggestions}>
                    {suggestions.map((sug, i) => (
                        <Pressable key={`${sug.title}-${i}`} style={[styles.suggestion, i > 0 && styles.suggestionBorder]} onPress={() => choose(sug)}>
                            <Ionicons name='location-outline' size={18} color={theme.primary} />
                            <View style={{ flex: 1 }}>
                                <RNText style={styles.suggestionTitle}>{sug.title}</RNText>
                                {!!sug.subtitle && <RNText style={styles.suggestionSub}>{sug.subtitle}</RNText>}
                            </View>
                        </Pressable>
                    ))}
                </View>
            )}
            <Input label='Apt / Suite / Floor' value={form.address_line_2} onChangeText={set('address_line_2')} style={styles.field}
                textContentType='streetAddressLine2' autoComplete='address-line2' />
            <View style={styles.row}>
                <Input label='City' value={form.city} onChangeText={set('city')} style={[styles.field, styles.half]}
                    textContentType='addressCity' autoComplete='postal-address-locality' />
                <Input label='Postal code' placeholder='K1P 1J1' value={form.postal_code} autoCapitalize='characters'
                    onChangeText={set('postal_code')} style={[styles.field, styles.half]}
                    textContentType='postalCode' autoComplete='postal-code' />
            </View>
            <Input label='Delivery notes' placeholder='Buzzer, entrance, etc.' value={form.notes}
                onChangeText={set('notes')} style={styles.field} multiline />
            <Button onPress={save} disabled={saving} style={styles.button}>
                {saving ? 'Saving…' : existing ? 'Save changes' : 'Save address'}
            </Button>
            <Text appearance='hint' category='c1' style={styles.hint}>
                We use this address to find the store that delivers to you.
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    suggestions: { marginTop: -6, marginBottom: 12, borderRadius: 12, borderWidth: 1, borderColor: theme.border, backgroundColor: theme.white, overflow: 'hidden' },
    suggestion: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 12 },
    suggestionBorder: { borderTopWidth: 1, borderTopColor: theme.border },
    suggestionTitle: { color: theme.text, fontFamily: theme.font.semibold, fontSize: 15 },
    suggestionSub: { color: theme.muted, fontFamily: theme.font.regular, fontSize: 13, marginTop: 1 },
    container: {
        padding: 20
    },
    types: { flexDirection: 'row', gap: 10, marginBottom: 16 },
    type: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, height: 44, borderRadius: 12, borderWidth: 1.5, borderColor: theme.primary },
    typeOn: { backgroundColor: theme.primary },
    typeText: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 15 },
    typeTextOn: { color: theme.white },
    field: {
        marginBottom: 14
    },
    row: {
        flexDirection: 'row',
        gap: 10
    },
    half: {
        flex: 1
    },
    button: {
        marginTop: 6
    },
    hint: {
        marginTop: 10,
        textAlign: 'center'
    }
});
