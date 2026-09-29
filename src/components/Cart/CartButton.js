import * as React from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme, formatPrice } from '../../theme';
import { useCart } from '../../hooks/useCart';
import { useBump } from '../../hooks/useBump';
import { useFlyToCart } from '../../context/FlyToCart';

// Header pill with the basket total; opens the cart. Hidden while empty.
export function CartButton() {
    const navigation = useNavigation();
    const { total, count } = useCart();
    const { pulse, setTarget } = useFlyToCart();
    const scale = useBump(pulse);
    const ref = React.useRef(null);
    if (count === 0)
        return null;

    const register = () => ref.current?.measureInWindow((x, y, width, height) => setTarget('header', { x, y, width, height }));

    return (
        <Animated.View ref={ref} onLayout={register} style={{ transform: [{ scale }] }}>
        <Pressable style={styles.pill} onPress={() => navigation.navigate('Root', { screen: 'Cart' })}>
            <View style={styles.iconBox}>
                <Ionicons name="basket" size={18} color={theme.primary} />
            </View>
            <Text style={styles.total}>{formatPrice(total)}</Text>
        </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.white,
        borderRadius: 10,
        marginRight: 12,
        overflow: 'hidden',
    },
    iconBox: {
        backgroundColor: theme.accent,
        paddingHorizontal: 9,
        paddingVertical: 7,
    },
    total: {
        paddingHorizontal: 10,
        color: theme.primary,
        fontFamily: theme.font.bold,
        fontSize: 14,
    },
});
