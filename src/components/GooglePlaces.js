import { Ionicons } from '@expo/vector-icons';
import { GOOGLE_MAPS_API_KEY } from '@/config';
import Colors from '../constants/Colors';
import * as React from 'react';
import axios from 'axios';
import {FloatingLabel } from './FloatingLabel'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function GooglePlaces(props) {
    var [address, setAddress] = React.useState([]);
    const [value, setValue] = React.useState((props.value) ? props.value : '');
    const [predictions, setPredictions] = React.useState([]);
    const error = props.error;

    const makeItems = (predictions) => {
        let items = [];

        for (let k in predictions)
        {
            var prediction = predictions[k];
            var structured_formatting = prediction.structured_formatting;
            var item = (
                <View key={k} style={styles.container}>
                    <TouchableOpacity key={k} onPress={() => {
                        let address = predictions[k];
                        let description = address.description;
                        setValue(description);
                        setAddress(address);
                        setPredictions([]);
                        props.onAddressSelected(address);
                    }}>
                        <Text style={styles.predictionMainText}>{structured_formatting.main_text}</Text>
                        <Text style={styles.predictionSecondaryText}>{structured_formatting.secondary_text}</Text>
                    </TouchableOpacity>
                </View>
            );
            items.push(item);
        }

        return items;
    }

    const onTextChange = (data) => {
        setValue(data);
        const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?' +
            'key=' + GOOGLE_MAPS_API_KEY + '&' + 
            '&input=' + data +
            '&inputtype=textquery' + 
            '&fields=formatted_address,name,rating,opening_hours';  

        axios.get(url).then(res => {
            if (!res.data.predictions)
                return;

            const predictions = res.data.predictions;
            const items = makeItems(predictions);
            setPredictions(items);
         
        }).catch(error => {
            // showMessage({
            //     message: 'Invalid request.',
            //     type: "danger"
            // });
        })
    }

    const errMsg = (
        <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 20, fontSize: 12, marginTop: -30 }}>
            <Ionicons
                name='close'
                size={18}
                style={{ marginBottom: -5 }}
                color={Colors.errorText}
            />
            <Text style={{ color: 'rgb(97,97, 98)', marginLeft: 5 }}>{error}</Text>
        </View>
    );

    return (
        <View>
            <FloatingLabel onTextChange={onTextChange} label={'Address'} value={value} disabled={props.disabled} />
            {error && errMsg}
            <View>{predictions}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.accentGreen,
        paddingTop: 10,
        paddingBottom: 10
    },  
    predictionMainText: {
        fontFamily: 'sodo-sans-semibold',
        fontSize: 16
    },
    predictionSecondaryText: {
        fontFamily: 'sodo-sans-regular',
        fontSize: 12,
    }
});

