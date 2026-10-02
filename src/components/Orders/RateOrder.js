import * as React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import http from '../../helpers/Http';
import { theme, formatPrice } from '../../theme';

const EXTRA_TIPS = [0, 1, 2, 5];

// After delivery: stars, an optional comment and an optional extra tip
// (charged to the same card). Once rated, a thank-you.
export function RateOrder({ order, onRated }) {
    const [stars, setStars] = React.useState(0);
    const [comment, setComment] = React.useState('');
    const [extraTip, setExtraTip] = React.useState(0);
    const [sending, setSending] = React.useState(false);

    if (order.rating) {
        return (
            <View style={styles.card}>
                <Text style={styles.title}>Thanks for your feedback! 💚</Text>
                <Text style={styles.stars}>{'⭐'.repeat(order.rating)}</Text>
                {order.tip + order.extra_tip > 0 && (
                    <Text style={styles.hint}>You tipped {formatPrice(order.tip + order.extra_tip)}. All of it goes to your driver.</Text>
                )}
            </View>
        );
    }

    const send = async () => {
        setSending(true);
        try {
            const res = await http.post(`orders/${order.id}/rating`, {
                stars, comment: comment.trim() || undefined, extra_tip_cents: Math.round(extraTip * 100),
            });
            onRated(res.data);
            if (extraTip) showMessage({ message: `Thank you! ${formatPrice(extraTip)} added to your tip.`, type: 'success' });
        } catch (err) {
            showMessage({ message: err.message, type: 'danger' });
        } finally {
            setSending(false);
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>How did we do?</Text>
            <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((n) => (
                    <Pressable key={n} onPress={() => setStars(n)} hitSlop={6}>
                        <Ionicons name={n <= stars ? 'star' : 'star-outline'} size={36} color={theme.accent} />
                    </Pressable>
                ))}
            </View>
            {stars > 0 && (
                <>
                    <TextInput style={styles.comment} value={comment} onChangeText={setComment} multiline maxLength={1000}
                        placeholder={stars >= 4 ? 'Anything you loved? (optional)' : 'What could we do better? (optional)'}
                        placeholderTextColor={theme.muted} />
                    <Text style={styles.label}>Add to your tip</Text>
                    <View style={styles.tips}>
                        {EXTRA_TIPS.map((amount) => (
                            <Pressable key={amount} style={[styles.chip, extraTip === amount && styles.chipOn]} onPress={() => setExtraTip(amount)}>
                                <Text style={[styles.chipText, extraTip === amount && styles.chipTextOn]}>{amount ? `+$${amount}` : 'No thanks'}</Text>
                            </Pressable>
                        ))}
                    </View>
                    <Pressable style={[styles.button, sending && { opacity: 0.6 }]} onPress={send} disabled={sending}>
                        {sending
                            ? <ActivityIndicator color={theme.white} />
                            : <Text style={styles.buttonText}>{extraTip ? `Send rating and ${formatPrice(extraTip)} tip` : 'Send rating'}</Text>}
                    </Pressable>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: { backgroundColor: theme.white, borderRadius: 16, padding: 18, marginHorizontal: 16, marginBottom: 12, alignItems: 'center', gap: 10 },
    title: { color: theme.text, fontFamily: theme.font.bold, fontSize: 18 },
    starRow: { flexDirection: 'row', gap: 8 },
    stars: { fontSize: 24 },
    hint: { color: theme.muted, fontFamily: theme.font.regular, fontSize: 14, textAlign: 'center' },
    comment: { alignSelf: 'stretch', minHeight: 64, borderWidth: 1, borderColor: theme.border, borderRadius: 12, padding: 10, fontFamily: theme.font.regular, fontSize: 15, color: theme.text },
    label: { alignSelf: 'flex-start', color: theme.muted, fontFamily: theme.font.semibold, fontSize: 13, marginTop: 4 },
    tips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignSelf: 'flex-start' },
    chip: { paddingHorizontal: 14, height: 38, borderRadius: 19, borderWidth: 1.5, borderColor: theme.border, alignItems: 'center', justifyContent: 'center' },
    chipOn: { borderColor: theme.primary, backgroundColor: theme.primarySoft },
    chipText: { color: theme.text, fontFamily: theme.font.semibold, fontSize: 14 },
    chipTextOn: { color: theme.primary },
    button: { alignSelf: 'stretch', height: 48, borderRadius: 12, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
    buttonText: { color: theme.white, fontFamily: theme.font.bold, fontSize: 16 },
});
