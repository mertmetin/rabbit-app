import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';

// − / count / + control. Shows a bin instead of − when one would remove the item.
// `vertical` is the compact version that sits on a product tile.
export function QuantityStepper({ quantity, onIncrease, onDecrease, vertical = false, size = 'small' }) {
    const icon = size === 'large' ? 24 : 18;
    const buttons = [
        <Pressable key="minus" onPress={onDecrease} hitSlop={6} style={[styles.button, size === 'large' && styles.buttonLarge]}>
            <Ionicons name={quantity === 1 ? 'trash-outline' : 'remove'} size={icon} color={theme.primary} />
        </Pressable>,
        <View key="count" style={[styles.count, size === 'large' && styles.countLarge]}>
            <Text style={[styles.countText, size === 'large' && styles.countTextLarge]}>{quantity}</Text>
        </View>,
        <Pressable key="plus" onPress={onIncrease} hitSlop={6} style={[styles.button, size === 'large' && styles.buttonLarge]}>
            <Ionicons name="add" size={icon} color={theme.primary} />
        </Pressable>,
    ];

    return (
        <View style={[styles.container, vertical ? styles.vertical : styles.horizontal]}>
            {vertical ? buttons.reverse() : buttons}
        </View>
    );
}

// The lone "+" shown before an item is in the cart.
export function AddButton({ onPress }) {
    return (
        <Pressable onPress={onPress} hitSlop={6} style={[styles.container, styles.button]}>
            <Ionicons name="add" size={20} color={theme.primary} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.white,
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 3,
    },
    vertical: {
        flexDirection: 'column',
    },
    horizontal: {
        flexDirection: 'row',
    },
    button: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLarge: {
        width: 64,
        height: 56,
    },
    count: {
        width: 34,
        height: 34,
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countLarge: {
        width: 72,
        height: 56,
    },
    countText: {
        color: theme.white,
        fontFamily: theme.font.bold,
        fontSize: 15,
    },
    countTextLarge: {
        fontSize: 20,
    },
});
