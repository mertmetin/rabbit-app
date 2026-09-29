import * as React from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useStripe } from '@stripe/stripe-react-native';
import { showMessage } from 'react-native-flash-message';
import http from '../../../helpers/Http';
import { getCurrentUser } from '../../../helpers/Auth';
import { theme } from '../../../theme';

const BRANDS = { visa: 'Visa', mastercard: 'Mastercard', amex: 'Amex', discover: 'Discover', jcb: 'JCB', unionpay: 'UnionPay' };
export const cardLabel = (card) => `${BRANDS[card.brand] || 'Card'} •••• ${card.last4}`;

// Saved cards (held by Stripe). Opened from checkout with `selecting`, a tap
// picks the card and returns; from the profile it's for adding/removing.
export default function PaymentMethodsScreen({ navigation, route }) {
    const selecting = route.params?.selecting;
    const selectedId = route.params?.selectedId;
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [cards, setCards] = React.useState(null);
    const [adding, setAdding] = React.useState(false);

    const load = React.useCallback(() => {
        http.get('payment/methods').then((res) => setCards(res.data)).catch((error) => {
            setCards([]);
            showMessage({ message: error.message, type: 'danger' });
        });
    }, []);
    useFocusEffect(load);

    const choose = (card) => navigation.navigate('Checkout', { paymentMethodId: card.id });

    const addCard = async () => {
        setAdding(true);
        try {
            const user = await getCurrentUser();
            const { data } = await http.post('payment/setup');
            const init = await initPaymentSheet({
                merchantDisplayName: 'Rabbit',
                customerId: data.customer_id,
                customerEphemeralKeySecret: data.ephemeral_key,
                setupIntentClientSecret: data.client_secret,
                defaultBillingDetails: { name: user?.name, email: user?.email },
                appearance: { colors: { primary: theme.primary } },
                returnURL: 'rabbit://stripe-redirect',
            });
            if (init.error)
                throw new Error(init.error.message);

            const { error } = await presentPaymentSheet();
            if (error) {
                if (error.code !== 'Canceled')
                    showMessage({ message: error.message, type: 'danger' });
                return;
            }

            showMessage({ message: 'Card saved.', type: 'success' });
            const { data: updated } = await http.get('payment/methods');
            setCards(updated);
            // New card goes first in Stripe's list; pick it when choosing for checkout.
            if (selecting && updated.length > 0)
                choose(updated[0]);
        } catch (error) {
            showMessage({ message: error.message, type: 'danger' });
        } finally {
            setAdding(false);
        }
    };

    const remove = (card) => Alert.alert(`Remove ${cardLabel(card)}?`, undefined, [
        { text: 'Cancel', style: 'cancel' },
        {
            text: 'Remove', style: 'destructive', onPress: () =>
                http.delete(`payment/methods/${card.id}`).then(load)
                    .catch((error) => showMessage({ message: error.message, type: 'danger' })),
        },
    ]);

    if (cards === null)
        return <ActivityIndicator style={{ marginTop: 40 }} />;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {cards.length > 0 && (
                <View style={styles.card}>
                    {cards.map((card, i) => (
                        <Pressable key={card.id} disabled={!selecting} onPress={() => choose(card)}
                            style={[styles.row, i < cards.length - 1 && styles.divider]}>
                            <View style={styles.icon}>
                                <Ionicons name="card" size={22} color={theme.primary} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.label}>{cardLabel(card)}</Text>
                                <Text style={styles.expiry}>Expires {String(card.exp_month).padStart(2, '0')}/{String(card.exp_year).slice(-2)}</Text>
                            </View>
                            {selecting ? (
                                <Ionicons name={card.id === selectedId ? 'radio-button-on' : 'radio-button-off'} size={24} color={theme.primary} />
                            ) : (
                                <Pressable onPress={() => remove(card)} hitSlop={10}>
                                    <Ionicons name="trash-outline" size={22} color={theme.danger} />
                                </Pressable>
                            )}
                        </Pressable>
                    ))}
                </View>
            )}

            {cards.length === 0 && <Text style={styles.empty}>No saved cards yet.</Text>}

            <Pressable style={[styles.addButton, adding && { opacity: 0.6 }]} onPress={addCard} disabled={adding}>
                {adding
                    ? <ActivityIndicator color={theme.white} />
                    : <><Ionicons name="add" size={22} color={theme.white} /><Text style={styles.addText}>Add card</Text></>}
            </Pressable>

            <View style={styles.secure}>
                <Ionicons name="lock-closed" size={14} color={theme.muted} />
                <Text style={styles.secureText}>Cards are stored securely by Stripe. Rabbit never sees your card number.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, gap: 16, backgroundColor: theme.background, flexGrow: 1 },
    card: { backgroundColor: theme.white, borderRadius: 16 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
    divider: { borderBottomWidth: 1, borderBottomColor: theme.border },
    icon: { width: 44, height: 44, borderRadius: 10, backgroundColor: theme.primarySoft, alignItems: 'center', justifyContent: 'center' },
    label: { color: theme.text, fontFamily: theme.font.semibold, fontSize: 16 },
    expiry: { marginTop: 2, color: theme.muted, fontFamily: theme.font.regular, fontSize: 13 },
    empty: { textAlign: 'center', color: theme.muted, fontFamily: theme.font.regular, fontSize: 15, marginTop: 12 },
    addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 15, borderRadius: 14, backgroundColor: theme.primary },
    addText: { color: theme.white, fontFamily: theme.font.bold, fontSize: 16 },
    secure: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: 12 },
    secureText: { flexShrink: 1, color: theme.muted, fontFamily: theme.font.regular, fontSize: 12, textAlign: 'center' },
});
