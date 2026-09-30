import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import http from '../../helpers/Http';
import { getCurrentUser } from '../../helpers/Auth';
import { LogoMark } from '../Logo';
import { theme } from '../../theme';
import { ACTIVE, HEADLINE, destinationOf, etaMinutes } from '../../helpers/Tracking';

const REFRESH_MS = 15000;

// Home-screen banner while an order is on its way; opens live tracking.
export function ActiveOrderBanner() {
    const navigation = useNavigation();
    const [order, setOrder] = React.useState(null);

    const load = React.useCallback(async () => {
        if (!(await getCurrentUser())) return setOrder(null);
        try {
            const res = await http.get('orders');
            setOrder(res.data.find((o) => ACTIVE.includes(o.status)) ?? null);
        } catch {
            setOrder(null);
        }
    }, []);

    useFocusEffect(React.useCallback(() => {
        load();
        const timer = setInterval(load, REFRESH_MS);
        return () => clearInterval(timer);
    }, [load]));

    if (!order)
        return null;

    const eta = order.status === 'out_for_delivery' ? etaMinutes(order.driver_location, destinationOf(order)) : null;

    return (
        <Pressable style={styles.banner} onPress={() => navigation.navigate('OrderTracking', { orderId: order.id, order })}>
            <View style={styles.icon}><LogoMark size={34} /></View>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{HEADLINE[order.status].title}</Text>
                <Text style={styles.subtitle}>{eta ? `Arriving in about ${eta} min` : `Order #${order.id} · Tap to track`}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={theme.white} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    banner: { flexDirection: 'row', alignItems: 'center', gap: 12, margin: 12, marginBottom: 0, padding: 14, borderRadius: 16, backgroundColor: theme.primary },
    icon: { width: 46, height: 46, borderRadius: 23, backgroundColor: theme.primaryDark, alignItems: 'center', justifyContent: 'center' },
    title: { color: theme.white, fontFamily: theme.font.bold, fontSize: 17 },
    subtitle: { marginTop: 2, color: theme.accent, fontFamily: theme.font.semibold, fontSize: 14 },
});
