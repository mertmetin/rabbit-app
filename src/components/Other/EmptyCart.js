import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { goHome } from '../../helpers/Navigation';

export function EmptyCart() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.iconCircle}>
                <Ionicons name="basket-outline" size={64} color={theme.primary} />
            </View>
            <Text style={styles.title}>Your basket is empty</Text>
            <Text style={styles.text}>Fresh groceries, delivered in minutes.</Text>
            <Pressable style={styles.button} onPress={() => goHome(navigation)}>
                <Text style={styles.buttonText}>Start shopping</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: theme.background,
    },
    iconCircle: {
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: theme.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginTop: 20,
        color: theme.text,
        fontFamily: theme.font.bold,
        fontSize: 20,
    },
    text: {
        marginTop: 6,
        color: theme.muted,
        fontFamily: theme.font.regular,
        fontSize: 15,
    },
    button: {
        marginTop: 24,
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: theme.primary,
    },
    buttonText: {
        color: theme.white,
        fontFamily: theme.font.bold,
        fontSize: 16,
    },
});
