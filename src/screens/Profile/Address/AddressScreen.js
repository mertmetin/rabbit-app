import React, { useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import {UserAddressContainer} from '../../../components/Containers/UserAddressContainer';
import { AddUserAddressList } from '../../../components/Lists/AddUserAddressList';

export default function AddressScreen({ navigation, route }) {
    const user_id = route.params.id;

    const onPress = (data) => {
        data.user_id = user_id;
        navigation.navigate('AddAddressScreen', {data: data});
    }

    return(
        <SafeAreaView>
            <Layout  style={styles.container}>
                    <View style={[styles.box_shadow, {paddingBottom: 50 }]}>
                        <UserAddressContainer user_id={user_id} />
                    </View>
                    <View style={{paddingBottom: 10, paddingLeft: 10}}>
                        <Text style={styles.text} category='h6'>Add Address</Text>
                    </View>
                    <View style={[styles.box_shadow]}>
                        <AddUserAddressList onPress={onPress} />
                    </View>
            </Layout>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#F1F1F1'    
    },
    box_shadow: {
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