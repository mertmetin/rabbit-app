import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CategoryCard } from '../CategoryCard';
import http from '../../helpers/Http';

export function ProductsCards(props) {
    const category = props.category;
    const [cards, setCards] = React.useState([]);

    const makeCards = (data) => {
        var cards = [];

        for (let k in data)
        {
            var category = data[k];
            console.log(category);
            var card = (
                <CategoryCard key={category.id} 
                    routeName={'ProductDetails'} 
                    item={category} 
                />
            );
            cards.push(card);
        }

        return cards;
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
        flexDirection: 'row', 
        flexWrap: 'wrap'
    }
})