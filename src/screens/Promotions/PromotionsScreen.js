import * as React from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import http from '../../helpers/Http';
import { theme } from '../../theme';

// Current offers as large photo cards.
export default function PromotionsScreen({ navigation }) {
    const [promotions, setPromotions] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

    const load = React.useCallback(async () => {
        try {
            const res = await http.get('promotions');
            setPromotions(res.data);
        } catch {
            setPromotions((current) => current ?? []);
        }
    }, []);

    React.useEffect(() => { load(); }, [load]);

    const refresh = async () => {
        setRefreshing(true);
        await load();
        setRefreshing(false);
    };

    if (promotions === null)
        return <ActivityIndicator style={{ marginTop: 40 }} />;

    return (
        <FlatList
            style={styles.screen}
            contentContainerStyle={styles.content}
            data={promotions}
            keyExtractor={(p) => String(p.id)}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={theme.primary} />}
            ListEmptyComponent={
                <View style={styles.empty}>
                    <Ionicons name="gift-outline" size={48} color={theme.muted} />
                    <Text style={styles.emptyTitle}>No offers right now</Text>
                    <Text style={styles.emptyText}>New deals show up here. Pull down to check again.</Text>
                </View>
            }
            renderItem={({ item }) => (
                <Pressable style={styles.card} onPress={() => navigation.navigate('PromotionDetailsScreen', item)}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.tag}>
                        <Ionicons name="pricetag" size={12} color={theme.text} />
                        <Text style={styles.tagText}>Offer</Text>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                        <Text style={styles.more}>See details ›</Text>
                    </View>
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.background },
    content: { padding: 16, gap: 16, flexGrow: 1 },
    card: { backgroundColor: theme.white, borderRadius: 18, overflow: 'hidden' },
    image: { width: '100%', aspectRatio: 16 / 9, backgroundColor: theme.primarySoft },
    tag: { position: 'absolute', top: 12, left: 12, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: theme.accent },
    tagText: { color: theme.text, fontFamily: theme.font.bold, fontSize: 12 },
    body: { padding: 16 },
    title: { color: theme.text, fontFamily: theme.font.bold, fontSize: 19 },
    description: { marginTop: 4, color: theme.muted, fontFamily: theme.font.regular, fontSize: 14, lineHeight: 20 },
    more: { marginTop: 10, color: theme.primary, fontFamily: theme.font.bold, fontSize: 14 },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, paddingTop: 80 },
    emptyTitle: { color: theme.text, fontFamily: theme.font.bold, fontSize: 18 },
    emptyText: { color: theme.muted, fontFamily: theme.font.regular, fontSize: 14, textAlign: 'center', paddingHorizontal: 32 },
});
