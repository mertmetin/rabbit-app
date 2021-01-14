import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import { Layout, Input, Button, Text, Card, IndexPath, Select, SelectItem, Avatar } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from '@ui-kitten/components';
import Map from '../../Other/Map';
import { Modal } from '../../Modals/Modal';

export const AddCardForm = props => {
    const AlertIcon = (props) => (
        <Ionicons size={11} {...props} name='md-information-circle-outline' />
    );

    return (
        <Formik
            initialValues={{
                card_no: '', exp_date: '', cvc: ''
            }}
            onSubmit={(values) => {props.onPress(values)}}
            validationSchema={props.validationSchema}
            >
            {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
                <View style={styles.container}>
                    <View style={{flexDirection: 'row', paddingLeft: 40, paddingRight: 40, paddingBottom: 20}}>
                        <View style={styles.box_shadow}>
                            <Card>
                                <Avatar source={require('../../../assets/images/icon_locked_box.png')} />
                            </Card>
                        </View>
                        <View style={{paddingLeft: 10}}>
                            <Text category='s1'>Security</Text>
                            <Text category='s2' style={{ paddingTop: 5, color: '#919293'}}>Rabbit does not keep any card information. 
                                Your card information is kept and secured by Stripe.</Text>
                        </View>
                    </View>

                    <Input
                        style={styles.field}
                        placeholder='4242 4242 4242 4242'
                        label='Card Number'
                        value={values.card_no}
                        textStyle={styles.textStyle}
                        onChangeText={handleChange('card_no')}
                        size='large'
                    />
                    {errors.card_no &&
                        <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start', marginTop: 2 }}>{errors.card_no}</Text>
                    }
                    <Input
                        style={styles.field}
                        placeholder='MM/YY'
                        label='Expiry Date'
                        value={values.exp_date}
                        captionIcon={AlertIcon}
                        caption='Find this date on the front of your card, under the card number'
                        textStyle={styles.textStyle}
                        onChangeText={handleChange('exp_date')}
                        size='large'
                    />
                    {errors.exp_date &&
                        <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start', marginTop: 2 }}>{errors.exp_date}</Text>
                    }
                    <Input
                        style={styles.field}
                        placeholder='123'
                        label='CVC'
                        value={values.cvc}
                        captionIcon={AlertIcon}
                        caption='A three-digit code on your credit card, on back of your card'
                        textStyle={styles.textStyle}
                        onChangeText={handleChange('cvc')}
                        size='large'
                    />
                    {errors.cvc &&
                        <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start', marginTop: 2 }}>{errors.cvc}</Text>
                    }
                    <Button onPress={handleSubmit} style={styles.button} >
                        Continue
                    </Button>
                    <View style={{paddingTop: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Avatar style={{width: 100}} source={require('../../../assets/images/stripe.png')} />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Avatar source={require('../../../assets/images/visa-48.png')} />
                            <Avatar source={require('../../../assets/images/american-express-48.png')} />
                            <Avatar source={require('../../../assets/images/mastercard-48.png')} />

                        </View>
                    </View>
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: 10,
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'stretch'
    },
    field: {
        marginTop: 5,
        marginBottom: 5
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