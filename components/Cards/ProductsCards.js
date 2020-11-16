import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, SectionList, SafeAreaView, FlatList } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CategoryCard } from '../CategoryCard';
import { ProductCard } from '../ProductCard';
import http from '../../helpers/Http';

export function ProductsCards(props) {
    const category = props.category;
    const storeId = props.storeId;
    const [sections, setSections] = React.useState([]);

    const renderList = ({ item }) => {
        return (
            <FlatList
                data={item}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ProductCard
                    routeName={'ProductDetails'}
                    item={item}
                />}
                numColumns={3}
                style={{marginBottom: 20}} 
            />
        );
    } 

    React.useEffect(() => {
        http.post('getStoreProducts', {
            category: category,
            storeId: storeId
        }).then(res => {
            if (!res.data)
                return;
            
            const data = res.data;
            const sections = (
                <SectionList
                    sections={data}
                    keyExtractor={(item, index) => (item + index).toString() }
                    renderItem={renderList}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                />
            );
            setSections(sections);
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
        <SafeAreaView style={styles.container}>
            {sections}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20 
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 20,
        fontFamily: 'sodo-sans-semibold',
        marginBottom: 15
    },
    title: {
        fontSize: 24
    }
})