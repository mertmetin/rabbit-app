import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CategoryCard } from '../CategoryCard';
import http from '../../helpers/Http';

export function ProductsCards(props) {
    const category = props.category;
    const [cards, setCards] = React.useState([]);

    const makeCards = (data) => {
        var sections = [];

        for (let k in data)
        {
            var category = data[k];
            var products = category.products;
            var cards = [];

            for (let i in products) {
                var product = products[i];
                var card = (
                    <CategoryCard key={i}
                        routeName={'ProductDetails'}
                        item={product}
                    />
                );
                cards.push(card);
            }

            if (!cards.length)
                continue;
                
            var section = (
                <View style={{paddingBottom: 30}} key={k}>
                    <Text style={{ fontFamily:'lander-grande-bold', marginBottom: 10}}>{category.title}</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>{cards}</View>
                </View>
            );
            sections.push(section);
        }

        return sections;
    }

    React.useEffect(() => {
        http.post('getProducts', {
            category: category
        })
        .then(res => {
            if (!res.data)
                return;

            const cards = makeCards(res.data);
            setCards(cards);
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

    return (
        <View style={styles.container}>
            {cards}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20, 
        flex: 1, 
        // flexDirection: 'row', 
        // flexWrap: 'wrap'
    }
})