import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from '@ui-kitten/components';
import http from '../helpers/Http';
import { useCart } from '../hooks/useCart';
import { theme, formatPrice, splitTitle } from '../theme';
import { ProductGrid } from '../components/Product/ProductGrid';
import { QuantityStepper } from '../components/Product/QuantityStepper';
import { VariantOptions } from '../components/Product/VariantOptions';
import { FavoriteButton } from '../components/Product/FavoriteButton';
import { MinOrderBar } from '../components/Cart/MinOrderBar';

// Big photo, price, name and size; option chips when the product comes in
// variants (milk fat, size); more from the same aisle below; add-to-cart /
// quantity pinned to the bottom, under the basket progress bar (this screen
// hides the tab bar, where that bar normally sits).
export default function ProductDetailsScreen({ route }) {
    const [product, setProduct] = React.useState(route.params.item);
    const [variants, setVariants] = React.useState({ options: [], variants: [] });
    const store = useSelector((state) => state.store.store);
    const cart = useCart();
    const quantity = cart.quantityOf(product.id);
    const { width } = useWindowDimensions();
    const { name, size } = splitTitle(product.title);
    const [related, setRelated] = React.useState([]);
    const photo = React.useRef(null);
    const add = () => photo.current
        ? photo.current.measureInWindow((x, y, w, h) => cart.increase(product, { x, y, width: w, height: h }))
        : cart.increase(product);

    React.useEffect(() => {
        if (!store || !product.group_id)
            return;
        http.get(`stores/${store.id}/products/${route.params.item.id}/variants`)
            .then((res) => setVariants(res.data))
            .catch(() => setVariants({ options: [], variants: [] }));
    }, [store, route.params.item.id]);

    React.useEffect(() => {
        if (!store || !product.category_id)
            return;
        const sameItem = (p) => p.id === product.id || (product.group_id && p.group_id === product.group_id);
        http.get(`stores/${store.id}/products`, { params: { category: product.category_id } })
            .then((res) => setRelated(res.data.flatMap((section) => section.data).filter((p) => !sameItem(p))))
            .catch(() => setRelated([]));
    }, [store, route.params.item.id]);

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.hero}>
                    <View>
                        <Image ref={photo} source={{ uri: product.image }} style={{ width: width * 0.7, height: width * 0.7, borderRadius: theme.radius }} />
                        <FavoriteButton product={product} style={styles.favorite} />
                    </View>
                    <Text style={styles.price}>{formatPrice(product.price)}</Text>
                    <Text style={styles.name}>{name}</Text>
                    {!!size && <Text style={styles.size}>{size}</Text>}
                    {!!product.description && <Text style={styles.description}>{product.description}</Text>}
                    {variants.variants.length > 1 &&
                        <VariantOptions options={variants.options} variants={variants.variants}
                            selected={product} onSelect={setProduct} />}
                </View>

                {related.length > 0 && (
                    <View style={styles.related}>
                        <Text style={styles.relatedTitle}>More like this</Text>
                        <ProductGrid products={related} />
                    </View>
                )}
            </ScrollView>

            <View style={styles.bottom}>
                <MinOrderBar />
                <View style={styles.footer}>
                    {quantity === 0
                        ? <Button size='large' style={styles.addButton} onPress={add}>
                            {`Add to basket · ${formatPrice(product.price)}`}
                          </Button>
                        : <QuantityStepper size='large' quantity={quantity}
                            onIncrease={add} onDecrease={() => cart.decrease(product)} />}
                </View>
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
        paddingBottom: 200,
    },
    hero: {
        alignItems: 'center',
        paddingTop: 24,
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    favorite: {
        position: 'absolute',
        top: 10,
        right: 10,
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
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    footer: {
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
