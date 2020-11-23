import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, TouchableHighlight } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import AppleStyleSwipeableRow from '../AppleStyleSwipeableRow';
import http from '../../helpers/Http';
import { connect } from 'react-redux'

function UserAddressesList(props) {
    const userId = props.userId;
    const [items, setItems] = React.useState([]);
    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        const onPress = () => {
            var redirectScreen = 'AddressDetails';

            if (props.redirectScreen)
            {
                redirectScreen =  props.redirectScreen;
                props.setDeliveryAddress(item);
            }

            navigation.navigate(redirectScreen, { userId: userId, address: item });
        }

        const addressType = item.address_type.type;
        var checkMarkIcon;
        var icon = '';

        if (addressType == 'home')
            icon = 'md-home';
        else if (addressType == 'work')
            icon = 'md-business';
        else if (addressType == 'other')
            icon = 'md-navigate';

        if (props.state.deliveryAddress[item.id])
        {
            checkMarkIcon = (<Ionicons
                name={'ios-checkmark-circle'}
                size={24}
                style={{ position: 'absolute', right: 0 }} />);
        }


        const removeAddress = () => {
            const addressId = item.id;
            http.delete(`users/${userId}/addresses/${addressId}`, {
                // id: item.id,
                // userId: userId
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
                            {checkMarkIcon}
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
        http.get(`users/${userId}/addresses`, {
            // userId: userId
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


const mapStateToProps = (state) => {
    return {
        state
    }
    // return {
    //     deliveryAddress: state
    // }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDeliveryAddress: (address) => dispatch({
            type: 'SET_DELIVERY_ADDRESS',
            payload: address
        }),
        removeDeliveryAddress: (address) => dispatch({
            type: 'REMOVE_DELIVERY_ADDRESS',
            payload: address
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAddressesList);

