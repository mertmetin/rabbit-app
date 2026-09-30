import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { LogoMark } from '../../components/Logo';
import { theme } from '../../theme';

// "Let's get started": choose how to sign in or sign up.
// Google and Facebook are placeholders for now. Note for launch: Apple
// requires "Sign in with Apple" alongside any Google/Facebook login on iOS.
export default function WelcomeScreen({ navigation, route }) {
    const returnTo = route.params?.returnTo;
    const comingSoon = (name) => () => showMessage({ message: `${name} sign-in is coming soon. Use your phone for now.`, type: 'info' });

    return (
        <View style={styles.screen}>
            <View style={styles.top}>
                <View style={styles.badge}>
                    <LogoMark size={64} />
                </View>
                <Text style={styles.title}>Let's get started!</Text>
                <Text style={styles.subtitle}>Choose a way to log in or sign up</Text>
            </View>

            <View style={styles.buttons}>
                <Pressable style={styles.outline} onPress={comingSoon('Google')}>
                    <Ionicons name="logo-google" size={22} color="#4285F4" />
                    <Text style={styles.outlineText}>Continue with Google</Text>
                </Pressable>
                <Pressable style={styles.outline} onPress={comingSoon('Facebook')}>
                    <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                    <Text style={styles.outlineText}>Continue with Facebook</Text>
                </Pressable>
                <Pressable style={styles.primary} onPress={() => navigation.navigate('PhoneSignIn', { returnTo })}>
                    <Ionicons name="call" size={20} color={theme.white} />
                    <Text style={styles.primaryText}>Continue with phone</Text>
                </Pressable>

                <View style={styles.orRow}>
                    <View style={styles.line} />
                    <Text style={styles.or}>or</Text>
                    <View style={styles.line} />
                </View>

                <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
                    <Text style={styles.guest}>Continue as guest</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, justifyContent: 'space-between', padding: 24, paddingBottom: 40, backgroundColor: theme.white },
    top: { alignItems: 'center', marginTop: 24 },
    badge: { width: 96, height: 96, borderRadius: 28, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
    title: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 28 },
    subtitle: { marginTop: 8, color: theme.text, fontFamily: theme.font.regular, fontSize: 16 },
    buttons: { gap: 14 },
    outline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, height: 56, borderRadius: 14, borderWidth: 1.5, borderColor: theme.primary },
    outlineText: { color: theme.primary, fontFamily: theme.font.bold, fontSize: 17 },
    primary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, height: 56, borderRadius: 14, backgroundColor: theme.primary },
    primaryText: { color: theme.white, fontFamily: theme.font.bold, fontSize: 17 },
    orRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 4 },
    line: { flex: 1, height: 1, backgroundColor: theme.border },
    or: { color: theme.muted, fontFamily: theme.font.regular, fontSize: 14 },
    guest: { textAlign: 'center', color: theme.muted, fontFamily: theme.font.semibold, fontSize: 16, paddingVertical: 6 },
});
