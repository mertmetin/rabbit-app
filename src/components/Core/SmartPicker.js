import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Colors from '../../constants/Colors';

// Row of choices, e.g. address type: home / work / other.
export function SmartPicker(props) {
    const { items, label, selectedValue, onValueChange } = props;

    return (
        <View style={styles.item}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.options}>
                {Object.values(items || {}).map((item) => {
                    const selected = item.type === selectedValue;
                    return (
                        <Pressable
                            key={item.id}
                            onPress={() => onValueChange(item.type)}
                            style={[styles.option, selected && styles.optionSelected]}
                        >
                            <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                                {item.type}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        marginBottom: 20
    },
    label: {
        fontFamily: 'sodo-sans-regular',
        marginBottom: 8
    },
    options: {
        flexDirection: 'row',
        gap: 8
    },
    option: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 14
    },
    optionSelected: {
        borderColor: Colors.accentGreen,
        backgroundColor: Colors.accentGreen
    },
    optionText: {
        fontFamily: 'sodo-sans-regular',
        textTransform: 'capitalize'
    },
    optionTextSelected: {
        color: '#fff'
    }
});
