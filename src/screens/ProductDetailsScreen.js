import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from '@ui-kitten/components';
import http from '../helpers/Http';
import { useCart } from '../hooks/useCart';
import { theme, formatPrice, splitTitle } from '../theme';
import { ProductGrid } from '../components/Product/ProductGrid';
import { QuantityStepper } from '../components/Product/QuantityStepper';

// Big photo, price, name and size; more from the same aisle below;
// add-to-cart / quantity pinned to the bottom.
export default function ProductDetailsScreen({ route }) {
    const product = route.params.item;
    const store = useSelector((state) => state.store.store);
    const cart = useCart();
    const quantity = cart.quantityOf(product.id);
    const { width } = useWindowDimensions();
    const { name, size } = splitTitle(product.title);
    const [related, setRelated] = React.useState([]);

    React.useEffect(() => {
        if (!store || !product.category_id)
            return;
        http.get(`stores/${store.id}/products`, { params: { category: product.category_id } })
            .then((res) => setRelated(res.data.flatMap((section) => section.data).filter((p) => p.id !== product.id)))
            .catch(() => setRelated([]));
    }, [store, product.id]);

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.hero}>
                    <Image source={{ uri: product.image }} style={{ width: width * 0.7, height: width * 0.7, borderRadius: theme.radius }} />
                    <Text style={styles.price}>{formatPrice(product.price)}</Text>
                    <Text style={styles.name}>{name}</Text>
                    {!!size && <Text style={styles.size}>{size}</Text>}
                    {!!product.description && <Text style={styles.description}>{product.description}</Text>}
                </View>

                {related.length > 0 && (
                    <View style={styles.related}>
                        <Text style={styles.relatedTitle}>More like this</Text>
                        <ProductGrid products={related} />
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                {quantity === 0
                    ? <Button size='large' style={styles.addButton} onPress={() => cart.increase(product)}>
                        {`Add to basket · ${formatPrice(product.price)}`}
                      </Button>
                    : <QuantityStepper size='large' quantity={quantity}
                        onIncrease={() => cart.increase(product)} onDecrease={() => cart.decrease(product)} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.white,
    },
    content: {
        paddingBottom: 120,
    },
    hero: {
        alignItems: 'center',
        paddingTop: 24,
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    price: {
        marginTop: 18,
        color: theme.primary,
        fontFamily: theme.font.bold,
        fontSize: 26,
    },
    name: {
        marginTop: 6,
        color: theme.text,
        fontFamily: theme.font.semibold,
        fontSize: 20,
        textAlign: 'center',
    },
    size: {
        marginTop: 4,
        color: theme.muted,
        fontFamily: theme.font.regular,
        fontSize: 16,
    },
    description: {
        marginTop: 12,
        color: theme.muted,
        fontFamily: theme.font.regular,
        fontSize: 14,
        textAlign: 'center',
    },
    related: {
        paddingTop: 18,
        borderTopWidth: 8,
        borderTopColor: theme.background,
    },
    relatedTitle: {
        paddingHorizontal: 16,
        marginBottom: 14,
        color: theme.text,
        fontFamily: theme.font.bold,
        fontSize: 17,
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        paddingTop: 14,
        paddingBottom: 34,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.96)',
        borderTopWidth: 1,
        borderTopColor: theme.border,
    },
    addButton: {
        alignSelf: 'stretch',
        backgroundColor: theme.primary,
        borderColor: theme.primary,
        borderRadius: 12,
    },
});
