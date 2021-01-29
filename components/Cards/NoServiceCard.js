import React, { Component, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, SafeAreaView, SectionList, FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, Avatar, List } from '@ui-kitten/components';

export function NoServiceCard(props) {

    var data = [
        {
            icon: require('../../assets/images/baguette-48.png')
        },
        {
            icon: require('../../assets/images/cheese-48.png')
        },
        {
            icon: require('../../assets/images/fish-and-vegetables-48.png')
        },
        {
            icon: require('../../assets/images/cereal-48.png')
        },
        {
            icon: require('../../assets/images/taco-48.png')
        },
        {
            icon: require('../../assets/images/ingredients-48.png')
        },
        {
            icon: require('../../assets/images/thanksgiving-48.png')
        },
        {
            icon: require('../../assets/images/vegetables-bag-48.png')
        }
    ];

    const renderItem = ({ item, index }) => (
        <Card style={styles.card} disabled>
            <Avatar size={'small'} style={{ marginLeft: -10, marginRight: -10 }}
                source={item.icon} />
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}} disabled>
                <Text style={{
                    marginTop: 10, marginBottom: 10}}>
                    Currently, we only provide service in Ottawa
                </Text>
                <List
                    scrollEnabled={false}
                    numColumns={4}
                    style={styles.list}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#e0e1e5',
        marginLeft: 15,
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 5

    },
    container: {
        // flex: 1,
        // padding: 25,
        backgroundColor: '#fff',
        borderRadius: 5,

        // flexDirection: 'column',
        // alignSelf: 'center',
        // height: 300
    },
    list: {
        backgroundColor: '#fff'
    },  
    box_shadow: {
        marginTop: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    }
});
