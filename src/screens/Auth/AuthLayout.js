import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LogoMark } from '../../components/Logo';
import { theme } from '../../theme';

// Shared frame for the sign-in steps: logo, one big question, content, and a
// footer that rides above the keyboard.
export function AuthLayout({ title, subtitle, children, footer }) {
    return (
        <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={100}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <View style={styles.badge}>
                    <LogoMark size={56} />
                </View>
                <Text style={styles.title}>{title}</Text>
                {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
                <View style={styles.body}>{children}</View>
            </ScrollView>
            <View style={styles.footer}>{footer}</View>
        </KeyboardAvoidingView>
    );
}

export function PrimaryButton({ title, onPress, disabled, loading }) {
    const { Pressable, ActivityIndicator } = require('react-native');
    return (
        <Pressable onPress={onPress} disabled={disabled || loading}
            style={[styles.button, (disabled || loading) && styles.buttonDisabled]}>
            {loading ? <ActivityIndicator color={theme.white} /> : <Text style={styles.buttonText}>{title}</Text>}
        </Pressable>
    );
}

export const authStyles = StyleSheet.create({
    error: { marginTop: 10, color: theme.danger, fontFamily: theme.font.semibold, fontSize: 14 },
    note: { marginTop: 14, color: theme.muted, fontFamily: theme.font.regular, fontSize: 13, textAlign: 'center' },
    link: { color: theme.primary, fontFamily: theme.font.bold },
});

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.white },
    content: { padding: 24, paddingTop: 28 },
    badge: { width: 76, height: 76, borderRadius: 22, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
    title: { color: theme.text, fontFamily: theme.font.bold, fontSize: 26 },
    subtitle: { marginTop: 8, color: theme.muted, fontFamily: theme.font.regular, fontSize: 16, lineHeight: 22 },
    body: { marginTop: 24 },
    footer: { paddingHorizontal: 24, paddingTop: 10, paddingBottom: 24, backgroundColor: theme.white },
    button: { alignItems: 'center', justifyContent: 'center', height: 54, borderRadius: 14, backgroundColor: theme.primary },
    buttonDisabled: { opacity: 0.45 },
    buttonText: { color: theme.white, fontFamily: theme.font.bold, fontSize: 17 },
});
