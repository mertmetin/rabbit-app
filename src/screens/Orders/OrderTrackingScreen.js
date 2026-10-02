import * as React from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import http, { API_URL } from '../../helpers/Http';
import Token from '../../helpers/Token';
import { LogoMark } from '../../components/Logo';
import { RateOrder } from '../../components/Orders/RateOrder';
import { theme, formatPrice } from '../../theme';
import { ACTIVE, HEADLINE, destinationOf, etaMinutes, timeOf } from '../../helpers/Tracking';

const REFRESH_MS = 5000;

const STEPS = [
    { key: 'placed', label: 'Order placed', done: (o) => true, time: (o) => o.placed_at },
    { key: 'packing', label: 'Preparing your order', done: (o) => ['preparing', 'ready', 'out_for_delivery', 'delivered'].includes(o.status), time: () => null },
    { key: 'on_the_way', label: 'On the way', done: (o) => ['out_for_delivery', 'delivered'].includes(o.status), time: (o) => o.picked_up_at },
    { key: 'delivered', label: 'Delivered', done: (o) => o.status === 'delivered', time: (o) => o.delivered_at },
];

// Live view of one order: status, arrival estimate, the driver on the map,
// a timeline, and the doorstep photo once delivered.
export default function OrderTrackingScreen({ route }) {
    const orderId = route.params.orderId;
    const [order, setOrder] = React.useState(route.params.order ?? null);
    const [token, setToken] = React.useState(null);
    const map = React.useRef(null);

    const load = React.useCallback(() =>
        http.get(`orders/${orderId}`).then((res) => setOrder(res.data)).catch(() => {}), [orderId]);

    React.useEffect(() => { Token.getToken().then(setToken); }, []);

    // Refresh while the order is still moving and this screen is open.
    useFocusEffect(React.useCallback(() => {
        load();
        const timer = setInterval(() => { if (!order || ACTIVE.includes(order.status)) load(); }, REFRESH_MS);
        return () => clearInterval(timer);
    }, [load, order?.status]));

    const destination = destinationOf(order);
    const driver = order?.driver_location;

    // Keep both the driver and the destination in view as the driver moves.
    React.useEffect(() => {
        if (map.current && driver && destination) {
            map.current.fitToCoordinates([driver, destination], {
                edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
                animated: true,
            });
        }
    }, [driver?.latitude, driver?.longitude]);

    if (!order)
        return <ActivityIndicator style={{ marginTop: 40 }} />;

    const headline = HEADLINE[order.status] ?? { title: order.status, subtitle: '' };
    const eta = order.status === 'out_for_delivery' ? etaMinutes(driver, destination) : null;

    const cancel = () => Alert.alert(`Cancel order #${order.id}?`, "You won't be charged.", [
        { text: 'Keep order', style: 'cancel' },
        { text: 'Cancel order', style: 'destructive', onPress: () =>
            http.post(`orders/${order.id}/cancel`).then((res) => setOrder(res.data))
                .catch((error) => showMessage({ message: error.message, type: 'danger' })) },
    ]);

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            {destination && (
                <MapView
                    ref={map}
                    style={styles.map}
                    initialRegion={{ ...destination, latitudeDelta: 0.03, longitudeDelta: 0.03 }}
                    scrollEnabled={false}
                >
                    <Marker coordinate={destination} title="You">
                        <View style={styles.homePin}><Ionicons name="home" size={18} color={theme.white} /></View>
                    </Marker>
                    {driver && (
                        <Marker coordinate={driver} title="Your driver" anchor={{ x: 0.5, y: 0.5 }}>
                            <View style={styles.driverPin}><LogoMark size={34} /></View>
                        </Marker>
                    )}
                </MapView>
            )}

            <View style={styles.card}>
                <Text style={styles.title}>{headline.title}</Text>
                <Text style={styles.subtitle}>
                    {eta ? `Arriving in about ${eta} min` : headline.subtitle}
                </Text>

                <View style={styles.timeline}>
                    {STEPS.map((step, i) => {
                        const done = step.done(order) && order.status !== 'cancelled';
                        const current = done && (i === STEPS.length - 1 || !STEPS[i + 1].done(order));
                        return (
                            <View key={step.key} style={styles.step}>
                                <View style={styles.rail}>
                                    <View style={[styles.dot, done && styles.dotDone, current && order.status !== 'delivered' && styles.dotCurrent]}>
                                        {done && <Ionicons name="checkmark" size={12} color={theme.white} />}
                                    </View>
                                    {i < STEPS.length - 1 && <View style={[styles.line, STEPS[i + 1].done(order) && styles.lineDone]} />}
                                </View>
                                <View style={styles.stepText}>
                                    <Text style={[styles.stepLabel, done && styles.stepLabelDone]}>{step.label}</Text>
                                    {done && timeOf(step.time(order)) && <Text style={styles.stepTime}>{timeOf(step.time(order))}</Text>}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>

            {order.status === 'delivered' && <RateOrder order={order} onRated={setOrder} />}

            {order.has_photo && token && (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Where we left it</Text>
                    <Image
                        source={{ uri: `${API_URL}orders/${order.id}/photo`, headers: { Authorization: `Bearer ${token}` } }}
                        style={styles.photo}
                    />
                </View>
            )}

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Order #{order.id}</Text>
                {order.items.map((item) => {
                    // After shopping: what was found; missing items aren't charged.
                    const found = item.found_quantity;
                    const missing = found === 0;
                    return (
                        <View key={item.product_id} style={styles.row}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.item, missing && styles.missing]} numberOfLines={1}>
                                    {found !== null && found < item.quantity && !missing ? found : item.quantity} × {item.title}
                                </Text>
                                {found !== null && found < item.quantity && (
                                    <Text style={styles.unavailable}>
                                        {missing ? 'Not available, not charged' : `${item.quantity - found} not available, not charged`}
                                    </Text>
                                )}
                            </View>
                            <Text style={[styles.price, missing && styles.missing]}>{formatPrice(item.line_total)}</Text>
                        </View>
                    );
                })}
                {order.tip > 0 && (
                    <View style={styles.row}>
                        <Text style={styles.item}>Driver tip</Text>
                        <Text style={styles.price}>{formatPrice(order.tip)}</Text>
                    </View>
                )}
                <View style={[styles.row, styles.totalRow]}>
                    <Text style={styles.totalLabel}>{order.charged ? 'Total charged' : 'Total (held on your card)'}</Text>
                    <Text style={styles.total}>{formatPrice(order.total)}</Text>
                </View>
                {order.delivery_address?.address_line_1 && (
                    <Text style={styles.address}>📍 {order.delivery_address.address_line_1}</Text>
                )}
            </View>

            {order.status === 'placed' && (
                <Pressable onPress={cancel} hitSlop={8}>
                    <Text style={styles.cancel}>Cancel order</Text>
                </Pressable>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    missing: { textDecorationLine: 'line-through', color: theme.muted },
    unavailable: { color: '#c0392b', fontFamily: theme.font.regular, fontSize: 12, marginTop: 2 },
    screen: { flex: 1, backgroundColor: theme.background },
    content: { paddingBottom: 32, gap: 14 },
    map: { height: 280 },
    homePin: { width: 34, height: 34, borderRadius: 17, backgroundColor: theme.text, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: theme.white },
    driverPin: { width: 46, height: 46, borderRadius: 23, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: theme.white },
    card: { marginHorizontal: 16, padding: 18, borderRadius: 18, backgroundColor: theme.white },
    title: { color: theme.text, fontFamily: theme.font.bold, fontSize: 24 },
    subtitle: { marginTop: 4, color: theme.primary, fontFamily: theme.font.semibold, fontSize: 16 },
    timeline: { marginTop: 18 },
    step: { flexDirection: 'row', gap: 12 },
    rail: { alignItems: 'center', width: 22 },
    dot: { width: 22, height: 22, borderRadius: 11, backgroundColor: theme.border, alignItems: 'center', justifyContent: 'center' },
    dotDone: { backgroundColor: theme.primary },
    dotCurrent: { borderWidth: 3, borderColor: theme.primarySoft },
    line: { width: 3, flex: 1, minHeight: 22, backgroundColor: theme.border },
    lineDone: { backgroundColor: theme.primary },
    stepText: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 18 },
    stepLabel: { color: theme.muted, fontFamily: theme.font.semibold, fontSize: 15 },
    stepLabelDone: { color: theme.text },
    stepTime: { color: theme.muted, fontFamily: theme.font.regular, fontSize: 14 },
    cardTitle: { marginBottom: 10, color: theme.text, fontFamily: theme.font.bold, fontSize: 16 },
    photo: { width: '100%', aspectRatio: 4 / 3, borderRadius: 12, backgroundColor: theme.background },
    row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingVertical: 4 },
    item: { flex: 1, color: theme.text, fontFamily: theme.font.regular, fontSize: 14 },
    price: { color: theme.text, fontFamily: theme.font.semibold, fontSize: 14 },
    totalRow: { marginTop: 6, paddingTop: 10, borderTopWidth: 1, borderTopColor: theme.border },
    totalLabel: { color: theme.text, fontFamily: theme.font.bold, fontSize: 15 },
    total: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 16 },
    address: { marginTop: 10, color: theme.muted, fontFamily: theme.font.regular, fontSize: 14 },
    cancel: { textAlign: 'center', color: theme.danger, fontFamily: theme.font.semibold, fontSize: 15 },
});
