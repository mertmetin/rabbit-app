import * as React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import http from '../../helpers/Http';
import { finishSignIn, formatPhone } from '../../helpers/AuthFlow';
import { theme } from '../../theme';
import { AuthLayout, PrimaryButton, authStyles } from './AuthLayout';

const LENGTH = 6;
const RESEND_SECONDS = 30;

// Step 2: the 6-digit code. One hidden input drives the six boxes, so iOS can
// offer the code from Messages and pasting works. Submits by itself when full.
export default function CodeScreen({ navigation, route }) {
    const { phone, returnTo } = route.params;
    // Only sent by a development server that isn't texting yet.
    const [devCode, setDevCode] = React.useState(route.params.devCode);
    const [code, setCode] = React.useState('');
    const [error, setError] = React.useState(null);
    const [checking, setChecking] = React.useState(false);
    const [wait, setWait] = React.useState(RESEND_SECONDS);
    const input = React.useRef(null);

    React.useEffect(() => {
        if (wait === 0) return;
        const timer = setTimeout(() => setWait(wait - 1), 1000);
        return () => clearTimeout(timer);
    }, [wait]);

    const verify = async (value) => {
        setChecking(true);
        setError(null);
        try {
            const res = await http.post('auth/verify', { phone, code: value });
            const { token, user } = res.data;
            if (user.needs_profile) {
                navigation.replace('CompleteProfile', { token, user, returnTo });
                return;
            }
            await finishSignIn(navigation, token, returnTo);
        } catch (err) {
            setError(err.message);
            setCode('');
            input.current?.focus();
        } finally {
            setChecking(false);
        }
    };

    const onChange = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, LENGTH);
        setCode(digits);
        setError(null);
        if (digits.length === LENGTH) verify(digits);
    };

    const resend = async () => {
        try {
            const res = await http.post('auth/start', { phone });
            setDevCode(res.data.dev_code);
            setWait(RESEND_SECONDS);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <AuthLayout
            title="Enter the code"
            subtitle={`We texted a 6-digit code to ${formatPhone(phone)}.`}
            footer={<PrimaryButton title="Continue" onPress={() => verify(code)} disabled={code.length !== LENGTH} loading={checking} />}
        >
            <Pressable style={styles.boxes} onPress={() => input.current?.focus()}>
                {Array.from({ length: LENGTH }, (_, i) => (
                    <View key={i} style={[styles.box, i === code.length && styles.boxActive, error && styles.boxError]}>
                        <Text style={styles.digit}>{code[i] ?? ''}</Text>
                    </View>
                ))}
            </Pressable>
            <TextInput
                ref={input}
                value={code}
                onChangeText={onChange}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
                maxLength={LENGTH}
                autoFocus
                style={styles.hidden}
                caretHidden
            />
            {error && <Text style={authStyles.error}>{error}</Text>}

            {devCode && (
                <Pressable style={styles.dev} onPress={() => onChange(devCode)}>
                    <Text style={styles.devText}>Dev code: <Text style={styles.devCode}>{devCode}</Text>  (tap to fill)</Text>
                </Pressable>
            )}

            <View style={styles.links}>
                {wait > 0
                    ? <Text style={styles.muted}>Resend code in 0:{String(wait).padStart(2, '0')}</Text>
                    : <Pressable onPress={resend} hitSlop={8}><Text style={authStyles.link}>Resend code</Text></Pressable>}
                <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
                    <Text style={authStyles.link}>Wrong number?</Text>
                </Pressable>
            </View>
        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    boxes: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
    box: { flex: 1, height: 60, borderWidth: 1.5, borderColor: theme.border, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    boxActive: { borderColor: theme.primary, borderWidth: 2 },
    boxError: { borderColor: theme.danger },
    digit: { color: theme.text, fontFamily: theme.font.bold, fontSize: 26 },
    hidden: { position: 'absolute', opacity: 0, height: 1, width: 1 },
    dev: { marginTop: 18, padding: 12, borderRadius: 10, backgroundColor: '#fff6dc', borderWidth: 1, borderColor: theme.accent },
    devText: { color: theme.text, fontFamily: theme.font.regular, fontSize: 14, textAlign: 'center' },
    devCode: { fontFamily: theme.font.bold, letterSpacing: 2 },
    links: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 22 },
    muted: { color: theme.muted, fontFamily: theme.font.regular, fontSize: 15 },
});
