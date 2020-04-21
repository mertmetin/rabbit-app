import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { CategoryCard } from '../components/CategoryCard';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function ProductDetailsScreen({ navigation, route }) {
    const item = route.params.item;

    return (
        <ScrollView>
            <View style={{backgroundColor: '#fff'}}>
                <Image style={{height: 500, padding: 50}} source={{ uri: 'http://localhost:8000/storage/' + item.image }} />
                <View style={{alignItems: 'center', paddingTop: 25}}>
                    <Text>{item.title}</Text>
                    <Text style={{ paddingTop: 10 }}>{item.description}</Text>
                </View>
            </View>
        </ScrollView>
    )
}