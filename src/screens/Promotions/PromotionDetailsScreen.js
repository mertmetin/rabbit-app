import * as React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { goHome } from '../../helpers/Navigation';
import { theme } from '../../theme';

export default function PromotionDetailsScreen({ navigation, route }) {
    const promotion = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({ title: 'Offer' });
    }, [navigation]);

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content}>
                <Image source={{ uri: promotion.image }} style={styles.image} />
                <View style={styles.body}>
                    <View style={styles.tag}>
                        <Ionicons name="pricetag" size={12} color={theme.text} />
                        <Text style={styles.tagText}>Rabbit offer</Text>
                    </View>
                    <Text style={styles.title}>{promotion.title}</Text>
                    <Text style={styles.description}>{promotion.description}</Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Pressable style={styles.button} onPress={() => goHome(navigation)}>
                    <Text style={styles.buttonText}>Start shopping</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.white },
    content: { paddingBottom: 24 },
    image: { width: '100%', aspectRatio: 4 / 3, backgroundColor: theme.primarySoft },
    body: { padding: 20, gap: 10 },
    tag: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: theme.accent },
    tagText: { color: theme.text, fontFamily: theme.font.bold, fontSize: 12 },
    title: { color: theme.text, fontFamily: theme.font.bold, fontSize: 26, lineHeight: 32 },
    description: { color: theme.text, fontFamily: theme.font.regular, fontSize: 16, lineHeight: 24 },
    footer: { padding: 16, paddingBottom: 30, borderTopWidth: 1, borderTopColor: theme.border },
    button: { alignItems: 'center', justifyContent: 'center', height: 54, borderRadius: 14, backgroundColor: theme.primary },
    buttonText: { color: theme.white, fontFamily: theme.font.bold, fontSize: 17 },
});
