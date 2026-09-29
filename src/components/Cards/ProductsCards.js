import React, { Component } from 'react';
import { StyleSheet, Text, SectionList, ActivityIndicator } from 'react-native';
import { ProductGrid } from '../Product/ProductGrid';
import { theme } from '../../theme';

// Product grid for one category: a section per subcategory, 3 products a row.
// `sections` is the API response: [{ id, title, data: [product, ...] }].
// Product grid for one category: a section per subcategory.
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
            renderItem={({ item }) => <ProductGrid products={item} />}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingBottom: 24,
        backgroundColor: theme.white
    },
    message: {
        padding: 24,
        textAlign: 'center'
    },
    header: {
        paddingHorizontal: 16,
        marginBottom: 14,
        fontSize: 18,
        color: theme.text,
        fontFamily: theme.font.bold
    }
});
