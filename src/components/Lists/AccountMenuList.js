import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { showMessage } from 'react-native-flash-message';
import { Alert } from 'react-native';
import http from '../../helpers/Http';
import { theme } from '../../theme';

const initials = (name = '') =>
    name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('') || '?';

// Signed-in profile: greeting card, shortcut tiles, settings menu, logout.
export const AccountMenuList = ({ user, logOut }) => {
    const navigation = useNavigation();
    const go = (route) => () => navigation.navigate(route, { ...user, data: user });

    const tiles = [
        { title: 'Previous Orders', icon: 'receipt', onPress: go('OrdersScreen') },
        { title: 'Favorites', icon: 'heart', onPress: go('FavoritesScreen') },
        { title: 'Help', icon: 'chatbubbles', onPress: go('HelpScreen') },
    ];

    const menu = [
        { title: 'Addresses', icon: 'location', onPress: go('AddressScreen') },
        { title: 'Payment Methods', icon: 'card', onPress: go('CardsScreen') },
        { title: 'Personal Info', icon: 'person-circle', onPress: go('InfoScreen') },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={[styles.card, styles.greeting]}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{initials(user.name)}</Text>
                </View>
                <View style={styles.greetingText}>
                    <Text style={styles.hello}>Hello 👋</Text>
                    <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
                </View>
                <Pressable onPress={go('InfoScreen')} hitSlop={10}>
                    <Ionicons name="create-outline" size={26} color={theme.primary} />
                </Pressable>
            </View>

            <View style={styles.tiles}>
                {tiles.map((tile) => (
                    <Pressable key={tile.title} style={[styles.card, styles.tile]} onPress={tile.onPress}>
                        <View style={styles.tileIcon}>
                            <Ionicons name={tile.icon} size={28} color={theme.primary} />
                        </View>
                        <Text style={styles.tileText}>{tile.title}</Text>
                    </Pressable>
                ))}
            </View>

            <View style={styles.card}>
                {menu.map((item, i) => (
                    <Pressable key={item.title} onPress={item.onPress}
                        style={[styles.row, i < menu.length - 1 && styles.rowDivider]}>
                        <Ionicons name={item.icon} size={22} color={theme.primary} />
                        <Text style={styles.rowText}>{item.title}</Text>
                        <Ionicons name="chevron-forward" size={20} color={theme.primary} />
                    </Pressable>
                ))}
            </View>

            <Pressable style={[styles.card, styles.row]} onPress={logOut}>
                <Ionicons name="log-out" size={22} color={theme.primary} />
                <Text style={styles.rowText}>Logout</Text>
            </Pressable>

            <Pressable onPress={() => Alert.alert(
                'Delete your account?',
                'Your name, email, phone, addresses and saved cards will be removed. This can\'t be undone.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Delete account', style: 'destructive', onPress: () =>
                            http.delete(`users/${user.id}`).then(logOut)
                                .catch((error) => showMessage({ message: error.message, type: 'danger' })),
                    },
                ])} hitSlop={8}>
                <Text style={styles.delete}>Delete account</Text>
            </Pressable>

            <Text style={styles.version}>Version {Constants.expoConfig?.version ?? '1.0.0'}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 14,
        backgroundColor: theme.background,
    },
    card: {
        backgroundColor: theme.white,
        borderRadius: 16,
    },
    greeting: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 14,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: theme.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: theme.primary,
        fontFamily: theme.font.bold,
        fontSize: 20,
    },
    greetingText: {
        flex: 1,
    },
    hello: {
        color: theme.text,
        fontFamily: theme.font.bold,
        fontSize: 18,
    },
    name: {
        marginTop: 2,
        color: theme.muted,
        fontFamily: theme.font.regular,
        fontSize: 15,
    },
    tiles: {
        flexDirection: 'row',
        gap: 10,
    },
    tile: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 18,
        gap: 10,
    },
    tileIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: theme.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tileText: {
        color: theme.text,
        fontFamily: theme.font.semibold,
        fontSize: 13,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    rowDivider: {
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    rowText: {
        flex: 1,
        color: theme.text,
        fontFamily: theme.font.semibold,
        fontSize: 16,
    },
    delete: {
        textAlign: 'center',
        color: theme.danger,
        fontFamily: theme.font.semibold,
        fontSize: 14,
    },
    version: {
        marginTop: 6,
        textAlign: 'center',
        color: theme.muted,
        fontFamily: theme.font.regular,
        fontSize: 13,
    },
});
