import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Formik } from 'formik';
import { Input, Button, Text, Card, Avatar } from '@ui-kitten/components';

import { Alert as AlertIcon } from '@/icons';

import { ErrorMessage } from '@/components/ErrorMessage';
import { CreditCardInput } from '@/components/Input/CreditCardInput';
import { DateInput } from '@/components/Input/DateInput';

const SecurityAlert = () => (
    <View style={styles.containerSecurity}>
    <View style={styles.box_shadow}>
        <Card>
            <Avatar source={require('../../../../assets/images/icon_locked_box.png')} />
        </Card>
    </View>
    <View>
        <Text category='s1'>Security</Text>
        <Text category='s2' style={styles.textAlert}>Rabbit does not keep any card information. 
            Your card information is kept and secured by Stripe.</Text>
    </View>
    </View>
)

const SupportedCards = () => (
    <View style={styles.containerSupportedCards}>
        <View>
            <Avatar style={{width: 100}} source={require('../../../../assets/images/stripe.png')} />
        </View>
        <View style={{flexDirection: 'row'}}>
            <Avatar source={require('../../../../assets/images/visa-48.png')} />
            <Avatar source={require('../../../../assets/images/american-express-48.png')} />
            <Avatar source={require('../../../../assets/images/mastercard-48.png')} />
        </View>
    </View>
)

export const AddCardForm = ({ validationSchema, submitHandler }) => {
    const initialValues = {
        card_no: '', 
        exp_date: '', 
        cvc: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => submitHandler(values)}
            validateOnChange={false}
            validationSchema={validationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, errors, values }) => (
                <View style={styles.container}>
                    <SecurityAlert />
                    <CreditCardInput 
                        value={values.card_no} 
                        setFieldValue={setFieldValue} 
                    />
                    {errors.card_no && <ErrorMessage msg={errors.card_no} />}
                    <DateInput 
                        value={values.exp_date} 
                        setFieldValue={setFieldValue} 
                        placeholder='MM/YY'
                        label='Expiry Date'
                        caption='Find this date on the front of your card, under the card number'
                        captionIcon={AlertIcon}
                    />
                    {errors.exp_date && <ErrorMessage msg={errors.exp_date} />}
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
                        numeric={true}
                        maxLength={3}
                    />
                    {errors.cvc && <ErrorMessage msg={errors.cvc} />}
                    <Button onPress={handleSubmit} style={styles.button} >
                        Continue
                    </Button>
                    <SupportedCards />
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    container: {
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
    },
    containerSecurity: {
        flexDirection: 'row', 
        paddingLeft: 40, 
        paddingRight: 40, 
        paddingBottom: 20
    },
    box_shadow: {
        paddingRight: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    textAlert: {
        paddingTop: 5, 
        color: '#919293',
    },
    containerSupportedCards: {
        paddingTop: 20, 
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    }
});