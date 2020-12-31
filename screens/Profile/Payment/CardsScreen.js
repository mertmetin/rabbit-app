import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { showMessage, hideMessage } from "react-native-flash-message";
import { ActionButton } from '../../../components/ActionButton';
import { FloatingLabel } from '../../../components/FloatingLabel';
import http from '../../../helpers/Http';

export default function CardsScreen({ navigation, route }) {
    const userId = route.params.data;
    const [paymentMethods, setPaymentMethods] = React.useState([]);

    const onPress  = () => {
        navigation.navigate('AddCardScreen', {userId, userId});
    }

    const makeItems = (paymentMethods) => {
        var items = []

        for (let k in paymentMethods)
        {
            var paymentMethod = paymentMethods[k];
            var item = (
                <View key={k}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('CardDetailsScreen', { paymentMethod: paymentMethod});
                    }} style={{ flexDirection: 'row' }}>
                        <Ionicons
                            size={30}
                            name='md-card'
                            style={{ paddingRight: 25 }}
                        />
                        <Text style={styles.cardLabel}>**** **** **** **** {paymentMethod.last4}</Text>
                    </TouchableOpacity>
                </View>
            );
            items.push(item);
        }

        return items;
    }
    
    React.useEffect(() => {
        http.get(`payment/methods?user_id=${userId}`, {
            // user_id: userId
        })
        .then(res => {
            if (!res.data)
                return;

            const paymentMethods = res.data;
            const items = makeItems(paymentMethods);
            setPaymentMethods(items);

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
            <View style={styles.container}>
                {paymentMethods}
                <ActionButton title={'Add Card'} onPress={onPress} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    cardLabel: {
        fontSize: 16,
        fontFamily: 'sodo-sans-regular',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC'
    }
});