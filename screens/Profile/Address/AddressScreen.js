import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { showMessage, hideMessage } from "react-native-flash-message";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ActionButton } from '../../../components/ActionButton';
import http from '../../../helpers/Http';

export default function AddressScreen({ navigation, route }) {
    const userId = route.params.data;
    const [items, setItems] = React.useState([]);

    const makeAddressItems = (addresses) => {
        var items = [];

        for (let k in addresses) {
            const address = addresses[k];

            const onPress = () => {
                navigation.navigate('AddressDetails', {userId: userId, address: address});
            }

            var item = (
                <View key={k} style={styles.addressContainer}>
                    <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress={onPress}>
                        <Ionicons
                            name={'md-home'}
                            size={24}
                            style={{paddingRight: 15}}
                        />
                        <Text style={styles.addressText}>
                            <Text>{address.main_text}{"\n"}</Text>
                            <Text>{address.secondary_text}</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            );
            items.push(item);
        }

        setItems(items);
    }

    React.useEffect(() => {
        http.post('getAddresses', {
            userId: userId
        })
        .then(res => {
            var items = [];

            if (res.data)
                makeAddressItems(res.data);    
            else 
                items.push(<Text>You have no address yet.</Text>)
        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }, []);

    const onPress = () => {
        navigation.navigate('AddAddressScreen', {data: userId});
    }

    return(
        <ScrollView style={{
            backgroundColor: '#f6f6f6'
        }}>
            <View style={styles.container}>
                {items}
                <ActionButton title={'Add new'} onPress={onPress} />
            </View>
        </ScrollView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // paddingLeft: 15
    },  
    addressContainer: {
        flex:1,
        flexDirection: 'row',
        paddingBottom: 15,
    },
    addressText: {
        fontSize: 16,
        fontFamily: 'sodo-sans-semibold'
    },
    // container: {
    //     flex: 1,
    //     backgroundColor: '#fafafa',
    // },
    contentContainer: {        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center'
    },
    input: {
        margin: 15,
        marginLeft: 20,
        marginRight: 20,
        padding: 15,
        height: 50,
        borderRadius: 5,
        borderColor: '#cacaca',
        borderWidth: 1
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center'
    },
    submitButton: {
        borderRadius: 5,
        backgroundColor: '#7a42f4',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
});