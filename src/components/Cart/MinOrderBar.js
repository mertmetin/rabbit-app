import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme, formatPrice } from '../../theme';
import { useCart } from '../../hooks/useCart';
import { MIN_ORDER } from '@/config';

// "You're $X away from the minimum order" with a progress line.
// Shown only while the cart has items but is below the minimum.
export function MinOrderBar() {
    const { total, count } = useCart();
    if (count === 0 || total >= MIN_ORDER)
        return null;

    const remaining = MIN_ORDER - total;
    const progress = Math.min(total / MIN_ORDER, 1);

    return (
        <View style={styles.container}>
            <View style={styles.message}>
                <Text style={styles.text}>
                    You're <Text style={styles.strong}>{formatPrice(remaining)}</Text> away from the{' '}
                    <Text style={styles.bold}>{formatPrice(MIN_ORDER)}</Text> minimum order
                </Text>
            </View>
            <View style={styles.track}>
                <View style={[styles.fill, { width: `${progress * 100}%` }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.primary,
        paddingHorizontal: 14,
        paddingTop: 10,
        paddingBottom: 12,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    message: {
        backgroundColor: theme.white,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    text: {
        textAlign: 'center',
        color: theme.text,
        fontFamily: theme.font.regular,
        fontSize: 13,
    },
    strong: {
        color: theme.primary,
        fontFamily: theme.font.bold,
    },
    bold: {
        fontFamily: theme.font.bold,
    },
    track: {
        height: 6,
        marginTop: 10,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.3)',
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 3,
        backgroundColor: theme.white,
    },
});
