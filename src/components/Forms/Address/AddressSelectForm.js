import React from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { Layout, Input, Button, Text, Modal, Card } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from '@ui-kitten/components';
import  Map from '../../Other/Map';
import { AddressForm } from './AddressForm';

export const AddressSelectForm = props => {
    const [visible, setVisible] = React.useState(false);
    const [showAddressForm, setShowAddressForm] = React.useState(false);

    var location = props.location;
    const LocationIcon = (props) => (
        <Ionicons size={24} {...props} name='location' />
    );

    const onPress = () => {
        setVisible(true)
    }

    return <View style={styles.container}>
        <Input
            style={styles.field}
            textStyle={styles.textStyle}
            disabled
            placeholder='Search Address'
            value={location.address_line_1}
            accessoryLeft={LocationIcon}
            size='large'
        />
        <Map marker={{
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude)
            }}
        /> 
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <Card style={{margin: 25}} disabled={true}>
                <Text style={{textAlign: 'center', fontWeight: '500'}}>Your order will be delivered to the pinned location on the map. 
                    Please confirm your pinned location.</Text>
                <View style={{marginTop: 15, flexDirection: 'row'}}>
                    <Button size={'large'} style={{ width: '50%', margin: 3}} onPress={() => setVisible(false)}>
                        No
                    </Button>
                    <Button size={'large'} style={{width: '50%', margin:3}} onPress={() => {
                        setVisible(false)
                        setShowAddressForm(true);
                        }}>
                        Yes
                    </Button>
                </View>
            </Card>
        </Modal>
        <View style={styles.bottom}>
            {showAddressForm ? <AddressForm onPress={props.onPress} location={location} />
                 : <Button onPress={onPress} style={styles.button}>Use this address</Button> }
           
        </View>
    </View>;
}   

const styles = StyleSheet.create({
    container: {
      position :'relative'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    textStyle: {
        fontWeight: '700'
    },
    field: {
        margin: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
    },
    button: {
        margin: 20
    },
    bottom: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1
    }
});