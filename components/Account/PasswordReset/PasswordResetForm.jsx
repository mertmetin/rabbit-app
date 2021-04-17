import React from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { Layout, Input, Button, Text } from '@ui-kitten/components';

import { ErrorMessage } from '../../ErrorMessage';
import { PhoneNumberInput } from '../../Input/PhoneNumberInput';

export const PasswordResetForm = ({ validationSchema, submitHandler }) => {
    const initialValues = { phone: '' };

    return(
        <Layout style={styles.container} level='1'>
            <Formik
                initialValues={initialValues}
                onSubmit={values => submitHandler(values)}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, errors, values }) => (
                    <View style={styles.container}>
                        <PhoneNumberInput 
                            value={values.phone} 
                            setFieldValue={setFieldValue} 
                        />
                        {errors.phone && <ErrorMessage msg={errors.phone} />}
                        <Button onPress={handleSubmit} style={styles.button} >
                            Send code
                        </Button>
                    </View>
                )}
            </Formik>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignItems: 'center',
    },
    textStyle: {
        fontWeight: '600'
    },
    field: {
        marginTop: 5,
        marginBottom: 5
    },
    button: {
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'stretch'
    }
});