import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, SafeAreaView, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CategoryCard } from '../CategoryCard';
import { ActionButton } from '../ActionButton';
import { IncreaseDecreaseInput } from '../IncreaseDecreaseInput';

export function CartCards(props) {
    const items = props.items;
    const navigation = useNavigation();

    function Item({ item }) {
        var itemId = item.id;
        const img = { uri: 'http://localhost:8000/storage/' + item.image };

        const onPress = () => {
            navigation.navigate('ProductDetails', {item: item});
        }

        const onIncrease = () => {
            props.onIncrease(item);
        }

        const onDecrease = () => {
            props.onDecrease(item);
        }

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.item}>
                    <View>
                        <Image source={img} style={styles.img} />
                    </View>
                    <View style={{ justifyContent: 'center', flexBasis: '45%', padding: 10 }}>
                        <Text style={{marginBottom: 5, fontFamily: 'sodo-sans-semibold'}}>{item.title}</Text>
                        <Text style={{ marginBottom: 5, fontFamily: 'sodo-sans-regular' }}>{item.description}</Text>
                        <Text style={{ marginBottom: 5, fontFamily: 'sodo-sans-semibold' }}>{item.price}</Text>
                    </View>
                    <View style={{ flexBasis: '55%', justifyContent: 'center'}}>
                        <IncreaseDecreaseInput onIncrease={onIncrease} onDecrease={onDecrease} start={items.quantity[itemId]}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.container} >
            <FlatList
                data={Object.values(items.items)}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
            />
            <View style={styles.footer}>
                <ActionButton title={'Continue'} />
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgContainer: {
        padding: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    img: {
        alignSelf: 'center',
        resizeMode: 'cover',
        width: 75,
        height: 75,
        margin: 10
    },
    item: {
        flexDirection: 'row', 
        paddingTop: 20, 
        paddingBottom: 20, 
        backgroundColor: '#fff', 
        borderBottomWidth: 1,
        borderBottomColor: '#4c9f87',
    },
    footer: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.40,
        shadowRadius: 2,
        elevation: 15,
        width: '100%'
    }
});
