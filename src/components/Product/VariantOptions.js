import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';

// Option chips for a product's variants (Milk fat: Skim 1% 2% 3.25%;
// Size: 1 L 2 L 4 L). Only values some in-stock variant has are shown.
// A value that doesn't combine with the current choices is dimmed; tapping
// it still works and switches to a variant that has it.
export function VariantOptions({ options, variants, selected, onSelect }) {
    const matches = (variant, wanted) => Object.entries(wanted).every(([name, value]) => variant.options?.[name] === value);

    const pick = (name, value) => {
        const wanted = { ...selected.options, [name]: value };
        const variant = variants.find((v) => matches(v, wanted)) ?? variants.find((v) => v.options?.[name] === value);
        if (variant && variant.id !== selected.id)
            onSelect(variant);
    };

    return (
        <View style={styles.container}>
            {options.map(({ name, values }) => {
                const available = values.filter((value) => variants.some((v) => v.options?.[name] === value));
                if (available.length < 2)
                    return null;
                return (
                    <View key={name} style={styles.option}>
                        <Text style={styles.label}>{name}</Text>
                        <View style={styles.chips}>
                            {available.map((value) => {
                                const active = selected.options?.[name] === value;
                                const combines = variants.some((v) => matches(v, { ...selected.options, [name]: value }));
                                return (
                                    <Pressable key={value} onPress={() => pick(name, value)}
                                        accessibilityRole='button' accessibilityState={{ selected: active }}
                                        style={[styles.chip, active && styles.chipActive, !combines && styles.chipDimmed]}>
                                        <Text style={[styles.chipText, active && styles.chipTextActive]}>{value}</Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        marginTop: 18,
    },
    option: {
        marginBottom: 14,
    },
    label: {
        marginBottom: 8,
        color: theme.muted,
        fontFamily: theme.font.semibold,
        fontSize: 13,
    },
    chips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        minWidth: 56,
        paddingVertical: 9,
        paddingHorizontal: 14,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.white,
    },
    chipActive: {
        borderColor: theme.primary,
        borderWidth: 1.5,
        backgroundColor: theme.primarySoft,
    },
    chipDimmed: {
        opacity: 0.45,
    },
    chipText: {
        color: theme.text,
        fontFamily: theme.font.semibold,
        fontSize: 14,
    },
    chipTextActive: {
        color: theme.primary,
    },
});
