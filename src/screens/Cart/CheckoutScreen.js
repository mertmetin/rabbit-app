import * as React from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useStripe } from '@stripe/stripe-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { cardLabel } from '../Profile/Payment/PaymentMethodsScreen';
import { showMessage } from 'react-native-flash-message';
import http from '../../helpers/Http';
import { getCurrentUser } from '../../helpers/Auth';
import { useCart } from '../../hooks/useCart';
import { theme, formatPrice, splitTitle } from '../../theme';

const DELIVERY_ESTIMATE = '20–35 min';

function Section({ title, children }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.card}>{children}</View>
        </View>
    );
}

function Checkbox({ label, value, onChange }) {
    return (
        <Pressable style={styles.checkRow} onPress={() => onChange(!value)} hitSlop={6}>
            <Ionicons name={value ? 'checkbox' : 'square-outline'} size={24} color={theme.primary} />
            <Text style={styles.checkLabel}>{label}</Text>
        </Pressable>
    );
}

function Choice({ label, hint, selected, onPress }) {
    return (
        <Pressable style={styles.choiceRow} onPress={onPress} hitSlop={4}>
            <Ionicons name={selected ? 'radio-button-on' : 'radio-button-off'} size={22} color={theme.primary} />
            <View style={{ flex: 1 }}>
                <Text style={styles.checkLabel}>{label}</Text>
                <Text style={styles.paymentHint}>{hint}</Text>
            </View>
        </Pressable>
    );
}

function SummaryRow({ label, value, strong, accent }) {
    return (
        <View style={[styles.summaryRow, strong && styles.summaryRowStrong]}>
            <Text style={[styles.summaryLabel, strong && styles.summaryStrong]}>{label}</Text>
            <Text style={[styles.summaryValue, strong && styles.summaryStrong, accent && { color: theme.primary }]}>{value}</Text>
        </View>
    );
}

// Review and pay: address and ETA, notes, payment, basket and totals.
// Totals come from the server; payment happens in Stripe's sheet.
export default function CheckoutScreen({ navigation, route }) {
    const cart = useCart();
    const address = useSelector((state) => state.deliveryAddress.address);
    const store = useSelector((state) => state.store.store);
    const { handleNextAction } = useStripe();
    const [cards, setCards] = React.useState(null);

    const [notes, setNotes] = React.useState('');
    const [contactless, setContactless] = React.useState(false);
    const [noBell, setNoBell] = React.useState(false);
    const [substitutions, setSubstitutions] = React.useState('similar');
    const [showItems, setShowItems] = React.useState(false);
    const [quote, setQuote] = React.useState(null);
    const [placing, setPlacing] = React.useState(false);

    const lines = Object.values(cart.items);
    const items = lines.map((p) => ({ product_id: p.id, quantity: cart.quantityOf(p.id) }));
    const itemsKey = JSON.stringify(items);
    const savedAddress = address && address.id ? address : null;

    React.useEffect(() => {
        if (!savedAddress || !store || items.length === 0)
            return;
        http.post('orders/quote', { store_id: store.id, address_id: savedAddress.id, items })
            .then((res) => setQuote(res.data))
            .catch((error) => {
                setQuote(null);
                showMessage({ message: error.message, type: 'danger' });
            });
    }, [savedAddress?.id, store?.id, itemsKey]);

    // Saved cards; the one picked on the Payment method screen, else the newest.
    useFocusEffect(React.useCallback(() => {
        http.get('payment/methods').then((res) => setCards(res.data)).catch(() => setCards([]));
    }, []));
    const card = cards && (cards.find((c) => c.id === route.params?.paymentMethodId) || cards[0]);
    const chooseCard = () => navigation.navigate('PaymentMethods', { selecting: true, selectedId: card?.id });

    const chooseAddress = async () => {
        const user = await getCurrentUser();
        navigation.navigate('AddressScreen', { id: user?.id, returnTo: 'Checkout' });
    };

    const placeOrder = async () => {
        if (!savedAddress)
            return chooseAddress();
        if (!card)
            return chooseCard();
        setPlacing(true);
        let orderId = null;
        try {
            const res = await http.post('orders', {
                store_id: store.id, address_id: savedAddress.id, items, payment_method_id: card.id,
                notes: notes.trim() || undefined, contactless, no_bell: noBell, substitutions,
            });
            const { order, payment } = res.data;
            orderId = order.id;

            // Some banks ask for 3-D Secure; Stripe shows its own prompt.
            if (payment.status === 'requires_action') {
                const { error } = await handleNextAction(payment.client_secret, 'rabbit://stripe-redirect');
                if (error) {
                    await http.post(`orders/${orderId}/cancel`).catch(() => {});
                    showMessage({ message: error.message, type: 'danger' });
                    return;
                }
            }

            const confirmed = await http.post(`orders/${orderId}/confirm`);
            cart.clear();
            navigation.replace('OrderPlaced', { order: confirmed.data });
        } catch (error) {
            showMessage({ message: error.message, type: 'danger' });
        } finally {
            setPlacing(false);
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.banner}>
                <Pressable style={styles.bannerAddress} onPress={chooseAddress}>
                    {savedAddress ? (
                        <Text numberOfLines={1} style={styles.bannerText}>
                            <Text style={styles.bannerLabel}>{savedAddress.label || 'Home'}, </Text>
                            {savedAddress.address_line_1}
                        </Text>
                    ) : (
                        <Text style={[styles.bannerText, styles.bannerLabel]}>Choose a delivery address ›</Text>
                    )}
                </Pressable>
                <View style={styles.bannerEta}>
                    <Ionicons name="time" size={20} color={theme.primary} />
                    <View>
                        <Text style={styles.etaLabel}>Delivery</Text>
                        <Text style={styles.etaValue}>{DELIVERY_ESTIMATE}</Text>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <Section title="Order note">
                    <TextInput
                        style={styles.noteInput}
                        placeholder="Anything the driver should know?"
                        placeholderTextColor={theme.muted}
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                        maxLength={500}
                    />
                    <View style={styles.checks}>
                        <Checkbox label="Contactless delivery" value={contactless} onChange={setContactless} />
                        <Checkbox label="Don't ring the bell" value={noBell} onChange={setNoBell} />
                    </View>
                </Section>

                <Section title="If something's unavailable">
                    <Choice label="Replace with something similar" hint="Never more than the original price."
                        selected={substitutions === 'similar'} onPress={() => setSubstitutions('similar')} />
                    <Choice label="Skip it" hint="You won't be charged for it."
                        selected={substitutions === 'skip'} onPress={() => setSubstitutions('skip')} />
                </Section>

                <Section title="Payment method">
                    <View style={styles.paymentRow}>
                        <View style={styles.paymentIcon}>
                            <Ionicons name="card" size={22} color={theme.primary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.paymentTitle}>{card ? cardLabel(card) : 'Add a payment card'}</Text>
                            {!card && <Text style={styles.paymentHint}>Stored securely by Stripe.</Text>}
                        </View>
                        <Pressable style={styles.outlineButton} onPress={chooseCard} disabled={cards === null}>
                            <Text style={styles.outlineText}>{card ? 'Change' : 'Add'}</Text>
                        </Pressable>
                    </View>
                </Section>

                <Section title="Basket summary">
                    <Pressable style={styles.productsRow} onPress={() => setShowItems(!showItems)}>
                        <Text style={styles.productsTitle}>Products ({cart.count})</Text>
                        <View style={styles.thumbs}>
                            {lines.slice(0, 3).map((p) => (
                                <Image key={p.id} source={{ uri: p.image }} style={styles.thumb} />
                            ))}
                        </View>
                        <Ionicons name={showItems ? 'chevron-up' : 'chevron-down'} size={20} color={theme.primary} />
                    </Pressable>
                    {showItems && lines.map((p) => (
                        <View key={p.id} style={styles.itemRow}>
                            <Text style={styles.itemName} numberOfLines={1}>
                                {cart.quantityOf(p.id)} × {splitTitle(p.title).name}
                            </Text>
                            <Text style={styles.itemPrice}>{formatPrice(p.price * cart.quantityOf(p.id))}</Text>
                        </View>
                    ))}
                </Section>

                <Section title="Payment summary">
                    {quote ? (
                        <>
                            <SummaryRow label="Products" value={formatPrice(quote.subtotal)} />
                            <SummaryRow label="Delivery" value={deliveryLabel(quote)} accent={!quote.delivery_fee} />
                            {quote.delivery_reason === 'standard' && (
                                <Text style={styles.deliveryHint}>
                                    Add {formatPrice(quote.free_delivery_over - quote.subtotal)} more for free delivery
                                </Text>
                            )}
                            <SummaryRow label="Tax (HST)" value={formatPrice(quote.tax)} />
                            <SummaryRow label="Total" value={formatPrice(quote.total)} strong />
                            <Text style={styles.holdNote}>
                                We'll hold {formatPrice(quote.total)} on your card and charge only for what we deliver, never more.
                            </Text>
                        </>
                    ) : savedAddress ? (
                        <ActivityIndicator style={{ padding: 16 }} />
                    ) : (
                        <Text style={styles.paymentHint}>Choose a delivery address to see your total.</Text>
                    )}
                </Section>

                <Text style={styles.terms}>By placing your order you agree to Rabbit's terms of service.</Text>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.checkout}>
                    <Pressable style={[styles.placeButton, (placing || (savedAddress && !quote)) && styles.disabled]}
                        disabled={placing || (savedAddress && !quote)} onPress={placeOrder}>
                        {placing
                            ? <ActivityIndicator color={theme.white} />
                            : <Text style={styles.placeText}>{!savedAddress ? 'Add address' : !card ? 'Add card' : 'Place order'}</Text>}
                    </Pressable>
                    <View style={styles.totalBox}>
                        <Text style={styles.total}>{formatPrice(quote ? quote.total : cart.total)}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

// "Free (first order)", "Free (over $40)" or the fee.
function deliveryLabel(quote) {
    if (quote.delivery_reason === 'first_order') return 'Free · first order';
    if (quote.delivery_reason === 'over_threshold') return 'Free';
    return formatPrice(quote.delivery_fee);
}

const styles = StyleSheet.create({
    choiceRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 8 },
    holdNote: { color: theme.muted, fontFamily: theme.font.regular, fontSize: 13, marginTop: 10, lineHeight: 18 },
    deliveryHint: { color: theme.primary, fontFamily: theme.font.semibold, fontSize: 13, marginTop: -2, marginBottom: 6 },
    screen: { flex: 1, backgroundColor: theme.background },
    banner: { flexDirection: 'row', backgroundColor: theme.white, borderBottomWidth: 1, borderBottomColor: theme.border },
    bannerAddress: { flex: 1, justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 14 },
    bannerText: { color: theme.text, fontFamily: theme.font.regular, fontSize: 14 },
    bannerLabel: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 15 },
    bannerEta: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, backgroundColor: theme.accent, borderTopLeftRadius: 14 },
    etaLabel: { color: theme.primaryDark, fontFamily: theme.font.semibold, fontSize: 12 },
    etaValue: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 17 },
    content: { padding: 16, paddingBottom: 32 },
    section: { marginBottom: 18 },
    sectionTitle: { marginBottom: 10, color: theme.text, fontFamily: theme.font.bold, fontSize: 17 },
    card: { backgroundColor: theme.white, borderRadius: 16, padding: 14 },
    noteInput: { minHeight: 56, borderWidth: 1, borderColor: theme.border, borderRadius: 10, padding: 12, fontFamily: theme.font.regular, fontSize: 15, color: theme.text },
    checks: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 12 },
    checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    checkLabel: { color: theme.text, fontFamily: theme.font.regular, fontSize: 14 },
    paymentRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    paymentIcon: { width: 44, height: 44, borderRadius: 10, backgroundColor: theme.primarySoft, alignItems: 'center', justifyContent: 'center' },
    paymentTitle: { color: theme.text, fontFamily: theme.font.semibold, fontSize: 15 },
    outlineButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, borderColor: theme.primary },
    outlineText: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 14 },
    paymentHint: { marginTop: 2, color: theme.muted, fontFamily: theme.font.regular, fontSize: 13 },
    productsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    productsTitle: { flex: 1, color: theme.text, fontFamily: theme.font.semibold, fontSize: 16 },
    thumbs: { flexDirection: 'row' },
    thumb: { width: 30, height: 30, borderRadius: 15, marginLeft: -8, borderWidth: 2, borderColor: theme.white },
    itemRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingTop: 10 },
    itemName: { flex: 1, color: theme.text, fontFamily: theme.font.regular, fontSize: 14 },
    itemPrice: { color: theme.text, fontFamily: theme.font.semibold, fontSize: 14 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: theme.border },
    summaryRowStrong: { borderBottomWidth: 0, marginTop: 4, marginHorizontal: -14, marginBottom: -14, paddingHorizontal: 14, paddingVertical: 14, backgroundColor: theme.primarySoft, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
    summaryLabel: { color: theme.text, fontFamily: theme.font.regular, fontSize: 15 },
    summaryValue: { color: theme.text, fontFamily: theme.font.semibold, fontSize: 15 },
    summaryStrong: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 17 },
    terms: { marginTop: 4, textAlign: 'center', color: theme.muted, fontFamily: theme.font.regular, fontSize: 12 },
    footer: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 34, backgroundColor: theme.white, borderTopWidth: 1, borderTopColor: theme.border },
    checkout: { flexDirection: 'row', borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: theme.border },
    placeButton: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 16, backgroundColor: theme.primary },
    disabled: { opacity: 0.5 },
    placeText: { color: theme.white, fontFamily: theme.font.bold, fontSize: 17 },
    totalBox: { paddingHorizontal: 20, justifyContent: 'center', backgroundColor: theme.white },
    total: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 20 },
});
