import * as React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme, formatPrice, splitTitle } from '../../theme';
import { useCart } from '../../hooks/useCart';
import { AddButton, QuantityStepper } from './QuantityStepper';

// Product card: photo, a +/stepper in the corner, then price, name and size,
// and how many options (sizes, milk fats) it comes in.
export function ProductTile({ product, width }) {
    const navigation = useNavigation();
    const cart = useCart();
    const quantity = cart.quantityOf(product.id);
    const { name, size } = splitTitle(product.title);
    const photo = React.useRef(null);

    // Add, flying the photo from where it sits on screen into the basket.
    const add = () => {
        if (!photo.current)
            return cart.increase(product);
        photo.current.measureInWindow((x, y, width, height) => cart.increase(product, { x, y, width, height }));
    };

    return (
        <Pressable style={[styles.container, { width }]} onPress={() => navigation.navigate('ProductDetails', { item: product })}>
            <View ref={photo} collapsable={false} style={[styles.imageBox, quantity > 0 && styles.imageBoxSelected, { height: width }]}>
                <Image source={{ uri: product.image }} style={styles.image} />
            </View>
            <View style={styles.control}>
                {quantity === 0
                    ? <AddButton onPress={add} />
                    : <QuantityStepper vertical quantity={quantity}
                        onIncrease={add} onDecrease={() => cart.decrease(product)} />}
            </View>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <Text style={styles.name} numberOfLines={2}>{name}</Text>
            {!!size && <Text style={styles.size} numberOfLines={1}>{size}</Text>}
            {product.variant_count > 1 && <Text style={styles.variants}>{`${product.variant_count} options`}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 18,
    },
    imageBox: {
        backgroundColor: theme.white,
        borderRadius: theme.radius,
        borderWidth: 1,
        borderColor: theme.border,
        overflow: 'hidden',
    },
    imageBoxSelected: {
        borderColor: theme.primary,
        borderWidth: 1.5,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    control: {
        position: 'absolute',
        top: -6,
        right: -6,
    },
    price: {
        marginTop: 8,
        color: theme.primary,
        fontFamily: theme.font.bold,
        fontSize: 15,
    },
    name: {
        marginTop: 2,
        color: theme.text,
        fontFamily: theme.font.semibold,
        fontSize: 13,
        lineHeight: 17,
    },
    size: {
        marginTop: 2,
        color: theme.muted,
        fontFamily: theme.font.regular,
        fontSize: 12,
    },
    variants: {
        marginTop: 3,
        color: theme.primary,
        fontFamily: theme.font.semibold,
        fontSize: 12,
    },
});
