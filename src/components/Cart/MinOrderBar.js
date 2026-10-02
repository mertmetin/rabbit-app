import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme, formatPrice } from '../../theme';
import { useCart } from '../../hooks/useCart';
import { useFirstOrder } from '../../hooks/useFirstOrder';
import { FREE_DELIVERY_OVER, MIN_ORDER } from '@/config';

// Basket progress above the tabs, in stages: up to the minimum, then up to
// free delivery, then "You've got free delivery". A customer whose first
// delivery is free just hears that once the minimum is reached.
export function MinOrderBar() {
    const { total, count } = useCart();
    const firstOrder = useFirstOrder(count > 0);
    if (count === 0)
        return null;

    let message;
    let progress;
    if (total < MIN_ORDER) {
        progress = total / MIN_ORDER;
        message = (
            <>
                Add <Text style={styles.strong}>{formatPrice(MIN_ORDER - total)}</Text> more to reach the{' '}
                <Text style={styles.bold}>{formatPrice(MIN_ORDER)}</Text> minimum
            </>
        );
    } else if (firstOrder || total >= FREE_DELIVERY_OVER) {
        progress = 1;
        message = (
            <>
                🎉 <Text style={styles.strong}>{firstOrder ? 'Your first delivery is free' : "You've got free delivery"}</Text>
            </>
        );
    } else {
        progress = total / FREE_DELIVERY_OVER;
        message = (
            <>
                Add <Text style={styles.strong}>{formatPrice(FREE_DELIVERY_OVER - total)}</Text> more for{' '}
                <Text style={styles.bold}>free delivery</Text>
            </>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.message}>
                <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>{message}</Text>
            </View>
            <View style={styles.track}>
                <View style={[styles.fill, { width: `${Math.min(progress, 1) * 100}%` }]} />
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
