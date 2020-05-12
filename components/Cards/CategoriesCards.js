import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, SafeAreaView, FlatList, Text, TouchableOpacity } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CategoryCard } from '../CategoryCard';
import http from '../../helpers/Http';

export function CategoriesCards(props) {
    const [selected, setSelected] = React.useState(new Map());
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        http.post('getProductCategories', {})
        .then(res => {
            setData(res.data);
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

    function Item({ item }) {
        return (
            <CategoryCard 
                routeName={'Products'}
                item={item}
            />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Item
                        item={item}
                    />
                )}
                numColumns={4}
                keyExtractor={item => item.id}
                extraData={selected}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
