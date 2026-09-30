import * as React from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import http from '../../../helpers/Http';
import { getCurrentUser } from '../../../helpers/Auth';
import { theme, splitTitle } from '../../../theme';
import { ProductGrid } from '../../../components/Product/ProductGrid';
import { FavoriteButton } from '../../../components/Product/FavoriteButton';

// The customer's hearted products: what the current store has on the shelf
// as a grid ready to add to the basket, then the ones it doesn't have now.
export default function FavoritesScreen() {
    const store = useSelector((state) => state.store.store);
    const [products, setProducts] = React.useState(null);

    useFocusEffect(React.useCallback(() => {
        getCurrentUser()
            .then((user) => http.get(`users/${user.id}/favorites`, { params: store ? { store_id: store.id } : {} }))
            .then((res) => setProducts(res.data))
            .catch((error) => {
                setProducts([]);
                showMessage({ message: error.message, type: 'danger' });
            });
    }, [store]));

    if (!products)
        return <View style={styles.center}><ActivityIndicator color={theme.primary} /></View>;

    if (products.length === 0)
        return (
            <View style={styles.center}>
                <Ionicons name='heart-outline' size={48} color={theme.primary} />
                <Text style={styles.emptyTitle}>No favorites yet</Text>
                <Text style={styles.emptyText}>Tap the heart on any product to find it here next time.</Text>
            </View>
        );

    // Without a store (no address yet) there's no stock to go by, so show them all.
    const available = store ? products.filter((p) => p.quantity > 0) : products;
    const unavailable = store ? products.filter((p) => !(p.quantity > 0)) : [];

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            {available.length > 0 && <ProductGrid products={available} />}

            {unavailable.length > 0 && (
                <View style={styles.unavailable}>
                    <Text style={styles.sectionTitle}>Not in stock right now</Text>
                    {unavailable.map((product) => {
                        const { name, size } = splitTitle(product.title);
                        return (
                            <View key={product.id} style={styles.row}>
                                <Image source={{ uri: product.image }} style={styles.thumb} />
                                <View style={styles.rowText}>
                                    <Text style={styles.rowName} numberOfLines={2}>{name}</Text>
                                    {!!size && <Text style={styles.rowSize}>{size}</Text>}
                                </View>
                                <FavoriteButton product={product} />
                            </View>
                        );
                    })}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.white,
    },
    content: {
        paddingTop: 16,
        paddingBottom: 32,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        backgroundColor: theme.white,
    },
    emptyTitle: {
        marginTop: 12,
        color: theme.text,
        fontFamily: theme.font.bold,
        fontSize: 18,
    },
    emptyText: {
        marginTop: 6,
        color: theme.muted,
        fontFamily: theme.font.regular,
        fontSize: 15,
        textAlign: 'center',
    },
    unavailable: {
        marginTop: 8,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        marginBottom: 8,
        color: theme.text,
        fontFamily: theme.font.bold,
        fontSize: 17,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    thumb: {
        width: 56,
        height: 56,
        borderRadius: 10,
        opacity: 0.5,
    },
    rowText: {
        flex: 1,
    },
    rowName: {
        color: theme.muted,
        fontFamily: theme.font.semibold,
        fontSize: 14,
    },
    rowSize: {
        marginTop: 2,
        color: theme.muted,
        fontFamily: theme.font.regular,
        fontSize: 12,
    },
});
