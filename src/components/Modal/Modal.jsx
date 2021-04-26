import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Modal as UIKittenModal, Card } from '@ui-kitten/components';

export const Modal = ({ visible, setVisible, handleSubmit, title, description }) => {
    const submitHandler = () => {
        setVisible(false);
        handleSubmit();
    }

    return (
        <UIKittenModal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <Card style={{margin: 25}} disabled={true}>
                <Text style={{textAlign: 'center', fontWeight: '500'}}>{title}</Text>
                <Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '500' }}>{description}</Text>
                <View style={{marginTop: 15, flexDirection: 'row'}}>
                    <Button size={'large'} style={{ width: '50%', margin: 3}} onPress={() => setVisible(false)}>
                        No
                    </Button>
                    <Button size={'large'} style={{width: '50%', margin:3}} onPress={submitHandler}>
                        Yes
                    </Button>
                </View>
            </Card>
        </UIKittenModal>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});