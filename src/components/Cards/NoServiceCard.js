import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LogoMark } from '../Logo';
import { theme } from '../../theme';

// Shown when no Rabbit branch delivers to the chosen address.
export function NoServiceCard({ onChangeAddress, onBrowse }) {
    return (
        <View style={styles.card}>
            <View style={styles.badge}>
                <LogoMark size={52} />
            </View>
            <Text style={styles.title}>We don't deliver here yet</Text>
            <Text style={styles.text}>
                Rabbit is just getting started in Ottawa and only delivers close to our shoppers for now. We're hopping further soon!
            </Text>
            <Pressable style={styles.primary} onPress={onChangeAddress}>
                <Text style={styles.primaryText}>Change address</Text>
            </Pressable>
            <Pressable onPress={onBrowse} hitSlop={8}>
                <Text style={styles.link}>Look around anyway</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: { alignItems: 'center', backgroundColor: theme.white, borderRadius: 18, padding: 24, margin: 16, gap: 10 },
    badge: { width: 80, height: 80, borderRadius: 24, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
    title: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 21, textAlign: 'center' },
    text: { color: theme.text, fontFamily: theme.font.regular, fontSize: 15, lineHeight: 21, textAlign: 'center' },
    primary: { alignSelf: 'stretch', height: 50, borderRadius: 12, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
    primaryText: { color: theme.white, fontFamily: theme.font.bold, fontSize: 16 },
    link: { color: theme.primary, fontFamily: theme.font.semibold, fontSize: 15, paddingVertical: 6 },
});
