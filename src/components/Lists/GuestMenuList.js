import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { theme } from '../../theme';

// Profile tab while signed out.
export const GuestMenuList = () => {
    const navigation = useNavigation();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Pressable style={[styles.card, styles.login]} onPress={() => navigation.navigate('SignIn')}>
                <View style={styles.avatar}>
                    <Ionicons name="person" size={26} color={theme.primary} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Log in or sign up</Text>
                    <Text style={styles.subtitle}>Save addresses, cards and your orders</Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color={theme.primary} />
            </Pressable>
            <Text style={styles.version}>Version {Constants.expoConfig?.version ?? '1.0.0'}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, gap: 14, backgroundColor: theme.background },
    card: { backgroundColor: theme.white, borderRadius: 16 },
    login: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
    avatar: { width: 56, height: 56, borderRadius: 14, backgroundColor: theme.primarySoft, alignItems: 'center', justifyContent: 'center' },
    title: { color: theme.text, fontFamily: theme.font.bold, fontSize: 17 },
    subtitle: { marginTop: 2, color: theme.muted, fontFamily: theme.font.regular, fontSize: 14 },
    version: { marginTop: 6, textAlign: 'center', color: theme.muted, fontFamily: theme.font.regular, fontSize: 13 },
});
