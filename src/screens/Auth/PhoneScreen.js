import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import http from '../../helpers/Http';
import { formatPhone } from '../../helpers/AuthFlow';
import { theme } from '../../theme';
import { AuthLayout, PrimaryButton, authStyles } from './AuthLayout';

// Step 1: the phone number. Works for new and returning customers alike.
export default function PhoneScreen({ navigation, route }) {
    const returnTo = route.params?.returnTo;
    const [phone, setPhone] = React.useState('');
    const [error, setError] = React.useState(null);
    const [sending, setSending] = React.useState(false);
    const digits = phone.replace(/\D/g, '');

    const send = async () => {
        setSending(true);
        setError(null);
        try {
            const res = await http.post('auth/start', { phone: digits });
            navigation.navigate('VerifyCode', { phone: res.data.phone, returnTo, devCode: res.data.dev_code });
        } catch (err) {
            setError(err.message);
        } finally {
            setSending(false);
        }
    };

    return (
        <AuthLayout
            title="What's your number?"
            subtitle="We'll text you a code to sign in. New here? This creates your account."
            footer={<PrimaryButton title="Send code" onPress={send} disabled={digits.length !== 10} loading={sending} />}
        >
            <View style={[styles.field, error && styles.fieldError]}>
                <Text style={styles.prefix}>🇨🇦 +1</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={(v) => { setPhone(formatPhone(v)); setError(null); }}
                    placeholder="(613) 555-0100"
                    placeholderTextColor={theme.muted}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    autoComplete="tel"
                    autoFocus
                    returnKeyType="done"
                    onSubmitEditing={() => digits.length === 10 && send()}
                />
            </View>
            {error && <Text style={authStyles.error}>{error}</Text>}
            <Text style={authStyles.note}>By continuing you agree to Rabbit's Terms and Privacy Policy.</Text>
        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    field: { flexDirection: 'row', alignItems: 'center', height: 58, borderWidth: 1.5, borderColor: theme.border, borderRadius: 14, paddingHorizontal: 16, gap: 12 },
    fieldError: { borderColor: theme.danger },
    prefix: { color: theme.text, fontFamily: theme.font.semibold, fontSize: 18 },
    input: { flex: 1, color: theme.text, fontFamily: theme.font.semibold, fontSize: 20, letterSpacing: 0.5 },
});
