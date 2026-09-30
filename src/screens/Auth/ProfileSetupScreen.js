import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import http from '../../helpers/Http';
import Token from '../../helpers/Token';
import { finishSignIn } from '../../helpers/AuthFlow';
import { theme } from '../../theme';
import { AuthLayout, PrimaryButton, authStyles } from './AuthLayout';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Step 3, new customers only: name, and email for receipts.
export default function ProfileSetupScreen({ navigation, route }) {
    const { token, user, returnTo } = route.params;
    const [name, setName] = React.useState(user.name || '');
    const [email, setEmail] = React.useState(user.email || '');
    const [error, setError] = React.useState(null);
    const [saving, setSaving] = React.useState(false);
    const valid = name.trim().length > 0 && EMAIL.test(email.trim());

    const save = async () => {
        setSaving(true);
        setError(null);
        try {
            await Token.setToken(token); // so the request below is signed in
            const res = await http.put(`users/${user.id}`, { name: name.trim(), email: email.trim() });
            await finishSignIn(navigation, res.data.token, returnTo);
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome to Rabbit!"
            subtitle="What should we call you?"
            footer={<PrimaryButton title="Start shopping" onPress={save} disabled={!valid} loading={saving} />}
        >
            <Text style={styles.label}>Your name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="First and last name"
                placeholderTextColor={theme.muted} textContentType="name" autoComplete="name" autoFocus returnKeyType="next" />
            <Text style={styles.label}>Email, for receipts</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="you@example.com"
                placeholderTextColor={theme.muted} keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
                textContentType="emailAddress" autoComplete="email" returnKeyType="done" onSubmitEditing={() => valid && save()} />
            {error && <Text style={authStyles.error}>{error}</Text>}
        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    label: { marginBottom: 8, marginTop: 4, color: theme.text, fontFamily: theme.font.semibold, fontSize: 14 },
    input: { height: 54, borderWidth: 1.5, borderColor: theme.border, borderRadius: 14, paddingHorizontal: 16, marginBottom: 16, color: theme.text, fontFamily: theme.font.regular, fontSize: 17 },
});
