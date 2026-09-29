import React, { Component } from 'react';
import { StyleSheet, Text, SectionList, FlatList, ActivityIndicator } from 'react-native';
import { ProductCard } from '../ProductCard';

// Product grid for one category: a section per subcategory, 3 products a row.
// `sections` is the API response: [{ id, title, data: [product, ...] }].
export function ProductsCards({ sections, listRef }) {
    if (sections === null)
        return <ActivityIndicator style={styles.message} />;

    if (sections.length === 0)
        return <Text style={styles.message}>Nothing here right now. Check back soon.</Text>;

    // Each section renders one "item": the whole grid of its products.
    const gridSections = sections.map(section => ({ ...section, data: [section.data] }));

    return (
        <SectionList
            ref={listRef}
            sections={gridSections}
            keyExtractor={(item, index) => String(index)}
            contentContainerStyle={styles.container}
            stickySectionHeadersEnabled={false}
            renderItem={({ item }) => (
                <FlatList
                    data={item}
                    keyExtractor={product => String(product.id)}
                    renderItem={({ item: product }) => <ProductCard routeName={'ProductDetails'} item={product} />}
                    numColumns={3}
                    scrollEnabled={false}
                    style={{ marginBottom: 20 }}
                />
            )}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    message: {
        padding: 24,
        textAlign: 'center'
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 20,
        fontFamily: 'sodo-sans-semibold',
        marginBottom: 15
    },
    title: {
        fontSize: 24
    }
})