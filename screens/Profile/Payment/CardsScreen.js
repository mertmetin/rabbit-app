import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { AddPaymentMethodList } from '../../../components/Lists/AddPaymentMethodList';

export default function CardsScreen({ navigation, route }) {
    const user_id = route.params.id;
    // const [paymentMethods, setPaymentMethods] = React.useState([]);

    const onPress  = () => {
        navigation.navigate('AddCardScreen', { user_id, user_id});
    }

    // const makeItems = (paymentMethods) => {
    //     var items = []

    //     for (let k in paymentMethods)
    //     {
    //         var paymentMethod = paymentMethods[k];
    //         var item = (
    //             <View key={k}>
    //                 <TouchableOpacity onPress={() => {
    //                     navigation.navigate('CardDetailsScreen', { paymentMethod: paymentMethod});
    //                 }} style={{ flexDirection: 'row' }}>
    //                     <Ionicons
    //                         size={30}
    //                         name='md-card'
    //                         style={{ paddingRight: 25 }}
    //                     />
    //                     <Text style={styles.cardLabel}>**** **** **** **** {paymentMethod.last4}</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         );
    //         items.push(item);
    //     }

    //     return items;
    // }
    
    // React.useEffect(() => {
    //     http.get(`payment/methods?user_id=${userId}`, {
    //         // user_id: userId
    //     })
    //     .then(res => {
    //         if (!res.data)
    //             return;

    //         const paymentMethods = res.data;
    //         const items = makeItems(paymentMethods);
    //         setPaymentMethods(items);

    //     }).catch(error => {
    //         const msg = error.response.data.message;
    //         showMessage({
    //             message: msg,
    //             type: "danger"
    //         });
    //     })
    // }, []);

    return(
        <SafeAreaView>
            <Layout level='1' style={styles.container}>
                <View style={[styles.innerContainer, styles.box_shadow]}>
                    <AddPaymentMethodList onPress={onPress} />
                </View>
            </Layout>
        </SafeAreaView>

        // <ScrollView>
        //     <View style={styles.container}>
        //         {paymentMethods}
        //         <ActionButton title={'Add Card'} onPress={onPress} />
        //     </View>
        // </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: 20
    },
    cardLabel: {
        fontSize: 16,
        fontFamily: 'sodo-sans-regular',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC'
    }
});