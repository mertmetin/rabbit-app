import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Button, Input, Text } from '@ui-kitten/components';
import { showMessage } from 'react-native-flash-message';
import http from '../../../helpers/Http';
import { goHome } from '../../../helpers/Navigation';

const POSTAL_CODE = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;

// Turns a typed address into map coordinates with the phone's own geocoder
// (Apple Maps on iOS), so no Google key is needed.
async function locate(address) {
    const query = [address.address_line_1, address.city, address.zone_code, address.postal_code, 'Canada']
        .filter(Boolean).join(', ');
    const results = await Location.geocodeAsync(query);
    return results[0] || null;
}

// New delivery address: typed in, located on the map, saved to the account,
// then used as the delivery address.
export const AddUserAddress = ({ data }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const type = data.type || 'home';
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        label: type.charAt(0).toUpperCase() + type.slice(1),
        address_line_1: '',
        address_line_2: '',
        city: 'Ottawa',
        zone_code: 'ON',
        postal_code: '',
        notes: '',
    });

    const set = (field) => (value) => setForm({ ...form, [field]: value });

    const save = async () => {
        if (!form.address_line_1.trim() || !form.city.trim())
            return showMessage({ message: 'Enter a street address and city.', type: 'warning' });
        if (form.postal_code && !POSTAL_CODE.test(form.postal_code.trim()))
            return showMessage({ message: 'That postal code looks wrong (e.g. K1P 1J1).', type: 'warning' });

        setSaving(true);
        try {
            const point = await locate(form);
            if (!point) {
                showMessage({ message: "We couldn't find that address on the map.", type: 'warning' });
                return;
            }

            const address = { ...form, address_type: type, latitude: point.latitude, longitude: point.longitude };
            const res = await http.post(`users/${data.user_id}/addresses`, { address });

            dispatch({ type: 'SET_DELIVERY_ADDRESS', payload: res.data });
            showMessage({ message: 'Address saved.', type: 'success' });
            data.returnTo ? navigation.navigate(data.returnTo) : goHome(navigation);
        } catch (error) {
            showMessage({ message: error.message, type: 'danger' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
            <Input label='Label' value={form.label} onChangeText={set('label')} style={styles.field} />
            <Input label='Street address' placeholder='110 Laurier Ave W' value={form.address_line_1}
                onChangeText={set('address_line_1')} style={styles.field} autoFocus />
            <Input label='Apt / Suite / Floor' value={form.address_line_2} onChangeText={set('address_line_2')} style={styles.field} />
            <View style={styles.row}>
                <Input label='City' value={form.city} onChangeText={set('city')} style={[styles.field, styles.half]} />
                <Input label='Postal code' placeholder='K1P 1J1' value={form.postal_code} autoCapitalize='characters'
                    onChangeText={set('postal_code')} style={[styles.field, styles.half]} />
            </View>
            <Input label='Delivery notes' placeholder='Buzzer, entrance, etc.' value={form.notes}
                onChangeText={set('notes')} style={styles.field} multiline />
            <Button onPress={save} disabled={saving} style={styles.button}>
                {saving ? 'Saving…' : 'Save address'}
            </Button>
            <Text appearance='hint' category='c1' style={styles.hint}>
                We use this address to find the store that delivers to you.
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
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
