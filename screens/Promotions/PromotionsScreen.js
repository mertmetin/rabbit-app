import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../components/Card';
import axios from 'axios';

export default function PromotionsScreen() {
    const [promotions, setPromotions] = React.useState([]);

    const makeItems = (promotions) => {
        var items = [];

        for (let k in promotions)
        {
            var promotion = promotions[k];
            var item = (
                <Card title={promotion.title} img={promotion.image} link={'PromotionDetailsScreen'} data={promotion} />
            );
            items.push(item);
        }

        return items;
    }


    React.useEffect(() => {
        axios.post('http://localhost:8000/api/getPromotions', {
        })
        .then(res => {
            if (!res.data)
                return;

            const promotions = makeItems(res.data);
            setPromotions(promotions)

        }).catch(error => {

        });
    }, []);


    return (
        <ScrollView style={styles.container}>
            <View>
                {promotions}
            </View>            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});