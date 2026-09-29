import React, { Component, useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { UserCards } from '@/components/Payment/UserCards';
import { AddPaymentMethodList } from '@/components/Lists/AddPaymentMethodList';

export default function CardsScreen({ navigation, route }) {
    const user_id = route.params.id; 
    const [shouldFetch, setShouldFetch] = useState(false);

    const onPress  = () => {
        navigation.navigate('AddCardScreen', { user_id: user_id, setShouldFetch:setShouldFetch });
    }

    return(
        <SafeAreaView>
            <Layout level='1' style={styles.container}>
                <View style={[styles.box_shadow, {paddingBottom: 20}]}>
                    <UserCards user_id={user_id} shouldFetch={shouldFetch} 
                        setShouldFetch={setShouldFetch} />
                </View>
                <View style={styles.box_shadow}>
                    <AddPaymentMethodList onPress={onPress} />
                </View>
            </Layout>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F1F1'    
    },
    cardLabel: {
        fontSize: 16,
        fontFamily: 'sodo-sans-regular',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC'
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