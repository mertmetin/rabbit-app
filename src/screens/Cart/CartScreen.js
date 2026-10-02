import * as React from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import http from '../../helpers/Http';
import { getCurrentUser } from '../../helpers/Auth';
import { useCart } from '../../hooks/useCart';
import { theme, formatPrice, splitTitle } from '../../theme';
import { FREE_DELIVERY_OVER, MIN_ORDER } from '@/config';
import { useFirstOrder } from '../../hooks/useFirstOrder';
import { QuantityStepper } from '../../components/Product/QuantityStepper';
import { ProductTile } from '../../components/Product/ProductTile';
import { EmptyCart } from '../../components/Other/EmptyCart';
import { showMessage } from 'react-native-flash-message';

// One basket line: photo, name/size, line total, and a stepper.
function CartRow({ product, quantity, cart }) {
    const { name, size } = splitTitle(product.title);
    return (
        <View style={styles.row}>
            <View style={styles.rowImage}>
                <Image source={{ uri: product.image }} style={styles.image} />
            </View>
            <View style={styles.rowText}>
                <Text style={styles.rowName} numberOfLines={2}>{name}</Text>
                {!!size && <Text style={styles.rowSize}>{size}</Text>}
                <Text style={styles.rowPrice}>{formatPrice(product.price * quantity)}</Text>
            </View>
            <QuantityStepper quantity={quantity}
                onIncrease={() => cart.increase(product)} onDecrease={() => cart.decrease(product)} />
        </View>
    );
}

export default function CartScreen() {
    const navigation = useNavigation();
    const cart = useCart();
    const store = useSelector((state) => state.store.store);
    const [recommended, setRecommended] = React.useState([]);

    // Bin in the header clears the basket (after confirming).
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => cart.count > 0 && (
                <Pressable hitSlop={10} style={{ marginRight: 16 }} onPress={() =>
                    Alert.alert('Empty your basket?', undefined, [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Empty basket', style: 'destructive', onPress: cart.clear },
                    ])}>
                    <Ionicons name="trash-outline" size={24} color={theme.white} />
                </Pressable>
            ),
        });
    }, [navigation, cart.count]);

    React.useEffect(() => {
        if (!store)
            return;
        http.get(`stores/${store.id}/popular`).then((res) => setRecommended(res.data)).catch(() => {});
    }, [store]);

    const firstOrder = useFirstOrder(cart.count > 0);

    if (cart.count === 0)
        return <EmptyCart />;

    const lines = Object.values(cart.items);
    const suggestions = recommended.filter((p) => !cart.items[p.id]).slice(0, 8);
    const remaining = MIN_ORDER - cart.total;
    const toFreeDelivery = FREE_DELIVERY_OVER - cart.total;

    const onContinue = async () => {
        if (remaining > 0)
            return;
        const user = await getCurrentUser();
        if (!user) {
            navigation.navigate('Root', { screen: 'Profile', params: { screen: 'SignIn', params: { returnTo: 'Checkout' } } });
            return;
        }
        navigation.navigate('Checkout');
    };

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.list}>
                    {lines.map((product) => (
                        <CartRow key={product.id} product={product} quantity={cart.quantityOf(product.id)} cart={cart} />
                    ))}
                </View>

                {suggestions.length > 0 && (
                    <View style={styles.suggestions}>
                        <Text style={styles.suggestionsTitle}>Recommended for you</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionRow}>
                            {suggestions.map((product) => (
                                <ProductTile key={product.id} product={product} width={112} />
                            ))}
                        </ScrollView>
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                {remaining > 0 ? (
                    <Text style={styles.minimum}>
                        Add <Text style={styles.minimumStrong}>{formatPrice(remaining)}</Text> more to reach the {formatPrice(MIN_ORDER)} minimum
                    </Text>
                ) : firstOrder ? (
                    <Text style={styles.minimum}>🎉 <Text style={styles.minimumStrong}>Your first delivery is free</Text></Text>
                ) : toFreeDelivery > 0 ? (
                    <Text style={styles.minimum}>
                        Add <Text style={styles.minimumStrong}>{formatPrice(toFreeDelivery)}</Text> more for free delivery
                    </Text>
                ) : (
                    <Text style={styles.minimum}>🎉 <Text style={styles.minimumStrong}>You've got free delivery</Text></Text>
                )}
                <View style={styles.checkout}>
                    <Pressable style={[styles.continue, remaining > 0 && styles.continueDisabled]} onPress={onContinue}>
                        <Text style={styles.continueText}>Continue</Text>
                    </Pressable>
                    <View style={styles.totalBox}>
                        <Text style={styles.total}>{formatPrice(cart.total)}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.background,
    },
    content: {
        paddingBottom: 24,
    },
    list: {
        backgroundColor: theme.white,
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        gap: 12,
    },
    rowImage: {
        width: 72,
        height: 72,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.border,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    rowText: {
        flex: 1,
    },
    rowName: {
        color: theme.text,
        fontFamily: theme.font.semibold,
        fontSize: 15,
    },
    rowSize: {
        marginTop: 2,
        color: theme.muted,
        fontFamily: theme.font.regular,
        fontSize: 13,
    },
    rowPrice: {
        marginTop: 6,
        color: theme.primary,
        fontFamily: theme.font.bold,
        fontSize: 16,
    },
    suggestions: {
        marginTop: 14,
        marginHorizontal: 12,
        paddingTop: 16,
        borderRadius: 18,
        backgroundColor: theme.primarySoft,
    },
    suggestionsTitle: {
        paddingHorizontal: 16,
        marginBottom: 14,
        color: theme.text,
        fontFamily: theme.font.bold,
        fontSize: 17,
    },
    suggestionRow: {
        paddingHorizontal: 16,
        gap: 12,
    },
    footer: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 26,
        backgroundColor: theme.white,
        borderTopWidth: 1,
        borderTopColor: theme.border,
    },
    minimum: {
        marginBottom: 10,
        textAlign: 'center',
        color: theme.text,
        fontFamily: theme.font.regular,
        fontSize: 13,
    },
    minimumStrong: {
        color: theme.primary,
        fontFamily: theme.font.bold,
    },
    checkout: {
        flexDirection: 'row',
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.border,
    },
    continue: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        backgroundColor: theme.primary,
    },
    continueDisabled: {
        opacity: 0.45,
    },
    continueText: {
        color: theme.white,
        fontFamily: theme.font.bold,
        fontSize: 17,
    },
    totalBox: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: theme.white,
    },
    total: {
        color: theme.primary,
        fontFamily: theme.font.bold,
        fontSize: 20,
    },
});
