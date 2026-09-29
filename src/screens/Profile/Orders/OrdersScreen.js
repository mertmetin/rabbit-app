import * as React from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import http from '../../../helpers/Http';
import { theme, formatPrice } from '../../../theme';

const STATUS = {
    placed: { label: 'Placed', color: theme.primary },
    preparing: { label: 'Preparing', color: theme.primary },
    out_for_delivery: { label: 'On the way', color: theme.primary },
    delivered: { label: 'Delivered', color: theme.muted },
    cancelled: { label: 'Cancelled', color: theme.danger },
};

const formatDate = (iso) => new Date(iso).toLocaleString('en-CA', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

// The customer's past and current orders; placed orders can still be cancelled.
export default function OrdersScreen() {
    const [orders, setOrders] = React.useState(null);

    const load = React.useCallback(() => {
        http.get('orders').then((res) => setOrders(res.data)).catch((error) => {
            setOrders([]);
            showMessage({ message: error.message, type: 'danger' });
        });
    }, []);

    useFocusEffect(load);

    const cancel = (order) => Alert.alert(`Cancel order #${order.id}?`, 'You will be refunded in full.', [
        { text: 'Keep order', style: 'cancel' },
        {
            text: 'Cancel order', style: 'destructive', onPress: () =>
                http.post(`orders/${order.id}/cancel`).then(load)
                    .catch((error) => showMessage({ message: error.message, type: 'danger' })),
        },
    ]);

    if (orders === null)
        return <ActivityIndicator style={{ marginTop: 40 }} />;

    if (orders.length === 0)
        return <Text style={styles.empty}>No orders yet. Your first one is a few taps away.</Text>;

    return (
        <FlatList
            data={orders}
            keyExtractor={(order) => String(order.id)}
            contentContainerStyle={styles.list}
            renderItem={({ item: order }) => {
                const status = STATUS[order.status] || { label: order.status, color: theme.muted };
                const count = order.items.reduce((sum, i) => sum + i.quantity, 0);
                return (
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <Text style={styles.orderId}>Order #{order.id}</Text>
                            <Text style={[styles.status, { color: status.color }]}>{status.label}</Text>
                        </View>
                        <Text style={styles.meta}>{formatDate(order.placed_at || order.created_at)} · {count} items</Text>
                        <Text style={styles.items} numberOfLines={2}>{order.items.map((i) => i.title).join(', ')}</Text>
                        <View style={styles.footer}>
                            <Text style={styles.total}>{formatPrice(order.total)}</Text>
                            {order.status === 'placed' && (
                                <Pressable onPress={() => cancel(order)} hitSlop={8}>
                                    <Text style={styles.cancel}>Cancel</Text>
                                </Pressable>
                            )}
                        </View>
                    </View>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    list: { padding: 16, gap: 12, backgroundColor: theme.background },
    empty: { padding: 32, textAlign: 'center', color: theme.muted, fontFamily: theme.font.regular, fontSize: 15 },
    card: { padding: 16, borderRadius: 16, backgroundColor: theme.white },
    header: { flexDirection: 'row', justifyContent: 'space-between' },
    orderId: { color: theme.text, fontFamily: theme.font.bold, fontSize: 16 },
    status: { fontFamily: theme.font.bold, fontSize: 14 },
    meta: { marginTop: 4, color: theme.muted, fontFamily: theme.font.regular, fontSize: 13 },
    items: { marginTop: 8, color: theme.text, fontFamily: theme.font.regular, fontSize: 14 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
    total: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 17 },
    cancel: { color: theme.danger, fontFamily: theme.font.semibold, fontSize: 14 },
});
