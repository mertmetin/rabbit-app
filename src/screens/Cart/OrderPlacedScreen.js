import * as React from 'react';
import { registerForPush } from '../../helpers/Push';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme, formatPrice } from '../../theme';
import { goHome } from '../../helpers/Navigation';

export default function OrderPlacedScreen({ navigation, route }) {
    // The moment updates are obviously useful: ask to send them.
    React.useEffect(() => { registerForPush({ ask: true }); }, []);
    const order = route.params.order;

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerLeft: () => null, gestureEnabled: false });
    }, [navigation]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.iconCircle}>
                <Ionicons name="checkmark" size={64} color={theme.white} />
            </View>
            <Text style={styles.title}>Order placed!</Text>
            <Text style={styles.subtitle}>Order #{order.id} is on its way to the store.</Text>
            <View style={styles.eta}>
                <Ionicons name="bicycle" size={22} color={theme.primary} />
                <Text style={styles.etaText}>Arriving in about 20–35 minutes</Text>
            </View>

            <View style={styles.card}>
                {order.items.map((item) => (
                    <View key={item.product_id} style={styles.row}>
                        <Text style={styles.item} numberOfLines={1}>{item.quantity} × {item.title}</Text>
                        <Text style={styles.price}>{formatPrice(item.line_total)}</Text>
                    </View>
                ))}
                <View style={[styles.row, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total paid</Text>
                    <Text style={styles.total}>{formatPrice(order.total)}</Text>
                </View>
            </View>

            <Pressable style={styles.button} onPress={() => navigation.replace('OrderTracking', { orderId: order.id, order })}>
                <Text style={styles.buttonText}>Track your order</Text>
            </Pressable>
            <Pressable onPress={() => goHome(navigation)} hitSlop={8} style={{ marginTop: 16 }}>
                <Text style={styles.secondaryText}>Back to shopping</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', padding: 24, paddingTop: 48, backgroundColor: theme.background, flexGrow: 1 },
    iconCircle: { width: 112, height: 112, borderRadius: 56, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center' },
    title: { marginTop: 20, color: theme.text, fontFamily: theme.font.bold, fontSize: 24 },
    subtitle: { marginTop: 6, color: theme.muted, fontFamily: theme.font.regular, fontSize: 15, textAlign: 'center' },
    eta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 18, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: theme.primarySoft },
    etaText: { color: theme.primary, fontFamily: theme.font.semibold, fontSize: 15 },
    card: { alignSelf: 'stretch', marginTop: 24, padding: 16, borderRadius: 16, backgroundColor: theme.white },
    row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingVertical: 6 },
    item: { flex: 1, color: theme.text, fontFamily: theme.font.regular, fontSize: 14 },
    price: { color: theme.text, fontFamily: theme.font.semibold, fontSize: 14 },
    totalRow: { marginTop: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: theme.border },
    totalLabel: { color: theme.text, fontFamily: theme.font.bold, fontSize: 16 },
    total: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 18 },
    button: { alignSelf: 'stretch', alignItems: 'center', marginTop: 24, paddingVertical: 16, borderRadius: 14, backgroundColor: theme.primary },
    secondaryText: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 16 },
    buttonText: { color: theme.white, fontFamily: theme.font.bold, fontSize: 17 },
});
