import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, TouchableHighlight } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import AppleStyleSwipeableRow from '../AppleStyleSwipeableRow';
import http from '../../helpers/Http';

export function UserAddressesList(props) {
    const userId = props.userId;
    const [items, setItems] = React.useState([]);
    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        const onPress = () => {
            console.log(item);
            navigation.navigate('AddressDetails', { userId: userId, address: item });
        }

        const addressType = item.address_type.type;
        var icon = '';

        if (addressType == 'home')
            icon = 'md-home';
        else if (addressType == 'work')
            icon = 'md-business';
        else if (addressType == 'other')
            icon = 'md-navigate';

        const removeAddress = () => {
            http.post('deleteAddress', {
                id: item.id,
                userId: userId
            }).then(
                navigation.push('AddressScreen', { data: userId })
            ).catch(error => {
                const msg = error.response.data.message;
                showMessage({
                    message: msg,
                    type: "success"
                });
            })
        }

        const rightActions = [
            {
                name: 'Remove',
                color: '#FF0000',
                x: 192,
                onPress: removeAddress
            }
        ];

        return (
            <View key={item.id} style={styles.addressContainer}>
                <AppleStyleSwipeableRow rightActions={rightActions}>
                    <TouchableOpacity onPress={onPress}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons
                                name={icon}
                                size={24}
                                style={{ paddingRight: 15 }}
                            />
                            <Text style={styles.addressText}>
                                <Text>{item.main_text}{"\n"}</Text>
                                <Text>{item.secondary_text}</Text>
                            </Text>
                        </View>
                        <View style={styles.editButton}>
                            <Text>
                                <Text>Edit</Text>
                            </Text>
                        </View>
                    </TouchableOpacity> 
                </AppleStyleSwipeableRow>
            </View>
        );
    }

    React.useEffect(() => {
        http.post('getAddresses', {
            userId: userId
        })
        .then(res => {
            if (!res.data)
                return;
            
            setItems(res.data);
            // var items = [];

            // if (res.data)
            //     makeAddressItems(res.data);
            // else
            //     items.push(<Text>You have no address yet.</Text>)
        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }, []);

    return (
        <SafeAreaView>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    addressContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 15,
    },
    addressText: {
        fontSize: 16,
        fontFamily: 'sodo-sans-semibold'
    },
    editButton: {
        flexDirection: 'column', 
        marginTop: 10, 
        paddingLeft: 35
    }
});