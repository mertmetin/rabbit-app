import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../components/Card';

export default function PromotionDetailsScreen({navigation, route}) {
    const params = route.params;

    return (
        <ScrollView style={styles.container}>
            <View>
                <Card title={params.title} img={params.image} />
             </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});