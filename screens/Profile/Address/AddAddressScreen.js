import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default function AddAddressScreen({ navigation, route }) {
    const userId = route.params.userId;
    const [address, setAddress] = React.useState('');
    const [placeId, setPlaceId] = React.useState('');
    
    return (
        // <ScrollView contentContainerStyle={styles.containerStyle}>
        <View style={styles.containerStyle}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    setAddress(data['description']);
                    setPlaceId(data['place_id']);
                }}

                getDefaultValue={() => ''}

                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: '***REMOVED***',
                    language: 'en', // language of the results
                    // types: '(cities)' // default: 'geocode'
                }}

                styles={{
                    textInputContainer: {
                        width: '100%'
                    },
                    description: {
                        fontWeight: 'bold'
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb'
                    }
                }}

                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    type: 'cafe'
                }}

                GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                    fields: 'formatted_address',
                }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                // predefinedPlaces={[homePlace, workPlace]}

                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
                // renderRightButton={() => <Text>Custom text after the input</Text>}
            />
            <TouchableOpacity style={styles.submitButton}
                onPress={() => {
                    axios.post('http://localhost:8000/api/addAddress', {
                        address: address,
                        placeId: placeId,
                        userId: userId
                    })
                        .then(res => {
                            showMessage({
                                message: 'Address is added successfully.',
                                type: "success"
                            });
                            navigation.navigate('Home');
                        }).catch(error => {
                            const msg = error.response.data.message;
                            showMessage({
                                message: msg,
                                type: "danger"
                            });
                        })
                }}
            >
                <Text style={styles.submitButtonText}> Save </Text>
            </TouchableOpacity>
            </View>
    );
}

// function OptionButton({ icon, label, onPress, isLastOption }) {
//     return (
//         <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
//             <View style={{ flexDirection: 'row' }}>
//                 <View style={styles.optionIconContainer}>
//                     <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
//                 </View>
//                 <View style={styles.optionTextContainer}>
//                     <Text style={styles.optionText}>{label}</Text>
//                 </View>
//             </View>
//         </RectButton>
//     );
// }

const styles = StyleSheet.create({
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
    containerStyle: {
        paddingTop: 25,
        paddingBottom: 25,
        backgroundColor: 'rgb(254, 254, 254)',
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%'
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
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center'
    },
    forgotPasswordButton: {
        marginTop: 20,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#6d828b'
    },
    forgotPasswordText: {
        color: '#6d828b'
    },
    registerButton: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#6a69c3',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    registerText: {
        color: '#6a69c3',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

const viewStyle = StyleSheet.create({
    containerStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginTop: 25,
        marginBottom: 25
    }
});