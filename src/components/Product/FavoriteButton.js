import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { useFavorites } from '../../hooks/useFavorites';

// Heart that saves or removes a product from the customer's favorites.
export function FavoriteButton({ product, style }) {
    const favorites = useFavorites();
    const on = favorites.isFavorite(product.id);

    return (
        <Pressable onPress={() => favorites.toggle(product)} hitSlop={10} style={[styles.button, style]}
            accessibilityRole='button' accessibilityLabel={on ? 'Remove from favorites' : 'Add to favorites'}
            accessibilityState={{ selected: on }}>
            <Ionicons name={on ? 'heart' : 'heart-outline'} size={24} color={on ? theme.danger : theme.muted} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.white,
        borderWidth: 1,
        borderColor: theme.border,
    },
});
