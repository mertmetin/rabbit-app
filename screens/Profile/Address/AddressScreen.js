import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function AddressScreen({ navigation, route }) {
    const userId = route.params.userId;
    const [items, setItems] = React.useState('');

    React.useEffect(() => {
        axios.post('http://localhost:8000/api/getAddresses', {
            userId: userId
        })
        .then(res => {
            var items = [];

            if (res.data)
            {
                const addresses = res.data;

                for (let i in addresses)
                {
                    const address = addresses[i];
                    var item = <Text>{address.address}</Text>;
                    items.push(item);
                }
            }
            else {
                items.push(<Text>You have no address yet.</Text>)
            }

            setItems(items);

        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }, []);

    return(
        <ScrollView>
            <View>
                <Text>{items}</Text>
                <TouchableOpacity style={styles.submitButton}
                    onPress={() => {
                        navigation.navigate('AddAddressScreen', {userId: userId});
                    }}>
                    <Text style={styles.submitButtonText}> Add Address </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
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