import React from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { Layout, Input, Button, Text, Modal as UIKittenModal, Card } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from '@ui-kitten/components';

export const Modal = props => {
    const onYesClick = props.onYesClick;
    const onNoClick = props.onNoClick;
    const title = props.title;
    const description = props.description;

    return (
        <UIKittenModal
            visible={true}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => onNoClick()}>
            <Card style={{ margin: 25 }} disabled={true}>
                <Text style={{ textAlign: 'center', fontWeight: '500' }}>{title}</Text>
                <Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '500' }}>{description}</Text>
                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                    <Button size={'large'} style={{ width: '50%', margin: 3 }} onPress={() => onNoClick()}>
                        No
                    </Button>
                    <Button size={'large'} style={{ width: '50%', margin: 3 }} onPress={() => {
                        onYesClick()
                        // setShowAddressForm(true);
                    }}>
                        Yes
                    </Button>
                </View>
            </Card>
        </UIKittenModal>
    );
}


const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});