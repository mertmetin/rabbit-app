import * as React from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import http from '../../../helpers/Http';
import Token from '../../../helpers/Token';
import { theme } from '../../../theme';
import { PrimaryButton, authStyles } from '../../Auth/AuthLayout';

// Edit name and email. The phone number is the login, so it isn't editable here.
export default function InfoScreen({ navigation, route }) {
    const user = route.params.data;
    const [name, setName] = React.useState(user.name || '');
    const [email, setEmail] = React.useState(user.email || '');
    const [error, setError] = React.useState(null);
    const [saving, setSaving] = React.useState(false);

    const save = async () => {
        setSaving(true);
        setError(null);
        try {
            const res = await http.put(`users/${user.id}`, { name: name.trim(), email: email.trim() });
            if (res.data.token)
                await Token.setToken(res.data.token);
            showMessage({ message: 'Saved.', type: 'success' });
            navigation.goBack();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} autoComplete="name" />
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address"
                autoCapitalize="none" autoCorrect={false} autoComplete="email" />
            <Text style={styles.label}>Phone</Text>
            <TextInput style={[styles.input, styles.disabled]} value={user.phone} editable={false} />
            {error && <Text style={authStyles.error}>{error}</Text>}
            <PrimaryButton title="Save" onPress={save} loading={saving} disabled={!name.trim() || !email.trim()} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: theme.white, flexGrow: 1 },
    label: { marginBottom: 8, color: theme.text, fontFamily: theme.font.semibold, fontSize: 14 },
    input: { height: 54, borderWidth: 1.5, borderColor: theme.border, borderRadius: 14, paddingHorizontal: 16, marginBottom: 16, color: theme.text, fontFamily: theme.font.regular, fontSize: 17 },
    disabled: { color: theme.muted, backgroundColor: theme.background },
});
