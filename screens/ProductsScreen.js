import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { CategoryCard } from '../components/CategoryCard';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function ProductsScreen({navigation, route}) {
    const category = route.params.category;
    const [items, setItems] = React.useState();

    React.useEffect(() => {
        axios.post('http://localhost:8000/api/getProducts', {
            category: category
        })
            .then(res => {
                var items = [];

                if (res.data) {
                    const categories = res.data;

                    for (let i in categories) {
                        const category = categories[i];

                        var item = (<CategoryCard key={category.id} title={category.title} image={category.image} />);
                        items.push(item);
                    }
                }
                else {
                    items.push(<Text>You have no address yet.</Text>)
                }

                setItems(items);

            }).catch(error => {

                if (error.response) {
                    const msg = error.response.data.message;
                    showMessage({
                        message: msg,
                        type: "danger"
                    });
                }

            })
    }, []);


    return(
        <ScrollView>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                {items}
            </View>
        </ScrollView>
    );
}