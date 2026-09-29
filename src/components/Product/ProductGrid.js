import * as React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { ProductTile } from './ProductTile';

const GAP = 12;

// Products in rows of `columns`, sized to the screen width.
export function ProductGrid({ products, columns = 3, padding = 16 }) {
    const { width } = useWindowDimensions();
    const tileWidth = Math.floor((width - padding * 2 - GAP * (columns - 1)) / columns);

    return (
        <View style={[styles.grid, { paddingHorizontal: padding }]}>
            {products.map((product) => (
                <ProductTile key={product.id} product={product} width={tileWidth} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: GAP,
    },
});
