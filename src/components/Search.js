import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import http from '../helpers/Http';
import { theme } from '../theme';
import { ProductGrid } from './Product/ProductGrid';

const DEBOUNCE_MS = 250;

// Search box over the chosen store's shelves; shows popular items until you type.
export function Search() {
    const store = useSelector((state) => state.store.store);
    const [query, setQuery] = React.useState('');
    const [hits, setHits] = React.useState(null);
    const [popular, setPopular] = React.useState([]);

    React.useEffect(() => {
        if (!store)
            return;
        http.get(`stores/${store.id}/popular`).then((res) => setPopular(res.data)).catch(() => setPopular([]));
    }, [store]);

    React.useEffect(() => {
        const q = query.trim();
        if (q.length < 2 || !store) {
            setHits(null);
            return;
        }
        const timer = setTimeout(() => {
            http.get('search', { params: { store_id: store.id, q } })
                .then((res) => setHits(res.data.hits))
                .catch(() => setHits([]));
        }, DEBOUNCE_MS);
        return () => clearTimeout(timer);
    }, [query, store]);

    if (!store)
        return <Text style={styles.message}>Choose a delivery address on the Home tab to search a store.</Text>;

    const searching = query.trim().length >= 2;

    return (
        <View>
            <View style={styles.bar}>
                <Ionicons name="search" size={22} color={theme.primary} />
                <TextInput
                    style={styles.input}
                    placeholder={`Search ${store.name}`}
                    placeholderTextColor={theme.muted}
                    value={query}
                    onChangeText={setQuery}
                    autoCorrect={false}
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                />
            </View>

            {searching ? (
                hits === null
                    ? <ActivityIndicator style={styles.message} />
                    : hits.length === 0
                        ? <Text style={styles.message}>No products match "{query.trim()}".</Text>
                        : <View style={styles.section}><ProductGrid products={hits} /></View>
            ) : (
                popular.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Popular right now</Text>
                        <ProductGrid products={popular} />
                    </View>
                )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: theme.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: theme.font.regular,
        color: theme.text,
    },
    section: {
        paddingTop: 18,
        backgroundColor: theme.white,
    },
    sectionTitle: {
        paddingHorizontal: 16,
        marginBottom: 14,
        color: theme.text,
        fontFamily: theme.font.bold,
        fontSize: 17,
    },
    message: {
        padding: 24,
        textAlign: 'center',
        color: theme.muted,
    },
});
