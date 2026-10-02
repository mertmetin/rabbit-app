import * as React from 'react';
import { LayoutAnimation, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, UIManager, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChatWootWidget from '@chatwoot/react-native-widget';
import { showMessage } from 'react-native-flash-message';
import http from '../../../helpers/Http';
import { theme, formatPrice } from '../../../theme';
import { CHATWOOT_BASE_URL, CHATWOOT_WEBSITE_TOKEN, DELIVERY_FEE, FREE_DELIVERY_OVER, MIN_ORDER, SUPPORT_EMAIL, SUPPORT_PHONE } from '../../../config';

if (Platform.OS === 'android')
    UIManager.setLayoutAnimationEnabledExperimental?.(true);

// Answers match how the app and server behave today; update them with any
// change to fees, minimums or the cancellation rule.
const FAQ = [
    {
        q: 'How much is delivery?',
        a: `Your first delivery is free. After that it's ${formatPrice(DELIVERY_FEE)}, or free on orders of ${formatPrice(FREE_DELIVERY_OVER)} or more. Orders need to be at least ${formatPrice(MIN_ORDER)} before tax.`,
    },
    {
        q: 'Where do you deliver?',
        a: 'Across Ottawa, from the Rabbit store nearest you. Add your address and the app shows which store delivers to you. If none does yet, we\'ll say so before you order.',
    },
    {
        q: 'Can I cancel my order?',
        a: 'Yes, until we start packing it. Go to Profile, then Previous Orders, and tap Cancel. You\'ll get a full refund.',
    },
    {
        q: 'When will I see my refund?',
        a: 'We refund your card right away. Most banks take 5 to 10 business days to show it on your statement.',
    },
    {
        q: 'How do I track my order?',
        a: 'Open it from the home screen or from Previous Orders. You\'ll see each step, the driver on the map once it\'s on the way, and a photo at your door when it\'s delivered.',
    },
    {
        q: 'Why is there tax on some items?',
        a: 'Basic groceries have no HST. Snacks, drinks like pop, and household and personal care items do, and it\'s shown on your receipt.',
    },
    {
        q: 'Something is missing or damaged',
        a: 'Sorry about that. Contact us below with your order number and we\'ll make it right.',
    },
    {
        q: 'How do I delete my account?',
        a: 'Go to Profile and tap Delete account at the bottom. Your personal details, addresses, cards and favorites are removed.',
    },
];

function Question({ q, a }) {
    const [open, setOpen] = React.useState(false);
    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpen(!open);
    };

    return (
        <Pressable onPress={toggle} style={styles.question} accessibilityRole='button' accessibilityState={{ expanded: open }}>
            <View style={styles.questionRow}>
                <Text style={styles.questionText}>{q}</Text>
                <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color={theme.primary} />
            </View>
            {open && <Text style={styles.answer}>{a}</Text>}
        </Pressable>
    );
}

// Help: common questions, then ways to reach us, starting with live chat.
export default function HelpScreen({ navigation }) {
    const [chatUser, setChatUser] = React.useState(null);

    // The server says who the customer is, so their chats arrive with their
    // name, phone and account attached.
    const openChat = () => http.get('support/chat-identity')
        .then((res) => setChatUser(res.data))
        .catch((error) => showMessage({ message: error.message, type: 'danger' }));

    const contacts = [
        CHATWOOT_WEBSITE_TOKEN && { title: 'Chat with us', detail: 'We usually reply within a few minutes', icon: 'chatbubbles', onPress: openChat },
        { title: 'Problem with an order', icon: 'receipt', onPress: () => navigation.navigate('OrdersScreen') },
        SUPPORT_EMAIL && { title: 'Email us', detail: SUPPORT_EMAIL, icon: 'mail', onPress: () => Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=Rabbit%20help`) },
        SUPPORT_PHONE && { title: 'Text us', detail: SUPPORT_PHONE, icon: 'chatbubble-ellipses', onPress: () => Linking.openURL(`sms:${SUPPORT_PHONE}`) },
        SUPPORT_PHONE && { title: 'Call us', detail: SUPPORT_PHONE, icon: 'call', onPress: () => Linking.openURL(`tel:${SUPPORT_PHONE}`) },
    ].filter(Boolean);

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            <Text style={styles.heading}>Common questions</Text>
            <View style={styles.card}>
                {FAQ.map((item, i) => (
                    <View key={item.q} style={i < FAQ.length - 1 && styles.divider}>
                        <Question {...item} />
                    </View>
                ))}
            </View>

            <Text style={styles.heading}>Still need help?</Text>
            <View style={styles.card}>
                {contacts.map((item, i) => (
                    <Pressable key={item.title} onPress={item.onPress}
                        style={[styles.row, i < contacts.length - 1 && styles.divider]}>
                        <Ionicons name={item.icon} size={22} color={theme.primary} />
                        <View style={styles.rowText}>
                            <Text style={styles.rowTitle}>{item.title}</Text>
                            {!!item.detail && <Text style={styles.rowDetail}>{item.detail}</Text>}
                        </View>
                        <Ionicons name='chevron-forward' size={20} color={theme.primary} />
                    </Pressable>
                ))}
            </View>

            {!!chatUser && (
                <ChatWootWidget
                    websiteToken={CHATWOOT_WEBSITE_TOKEN}
                    baseUrl={CHATWOOT_BASE_URL}
                    locale='en'
                    colorScheme='light'
                    isModalVisible
                    closeModal={() => setChatUser(null)}
                    user={{ identifier: chatUser.identifier, identifier_hash: chatUser.identifier_hash, name: chatUser.name, email: chatUser.email }}
                    customAttributes={chatUser.custom_attributes}
                />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.background,
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    heading: {
        marginTop: 8,
        marginBottom: 10,
        color: theme.text,
        fontFamily: theme.font.bold,
        fontSize: 17,
    },
    card: {
        marginBottom: 16,
        backgroundColor: theme.white,
        borderRadius: 16,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    question: {
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    questionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    questionText: {
        flex: 1,
        color: theme.text,
        fontFamily: theme.font.semibold,
        fontSize: 15,
    },
    answer: {
        marginTop: 10,
        color: theme.muted,
        fontFamily: theme.font.regular,
        fontSize: 14,
        lineHeight: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    rowText: {
        flex: 1,
    },
    rowTitle: {
        color: theme.text,
        fontFamily: theme.font.semibold,
        fontSize: 16,
    },
    rowDetail: {
        marginTop: 2,
        color: theme.muted,
        fontFamily: theme.font.regular,
        fontSize: 13,
    },
});
