import React from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

export const PasswordResetForm = props => {
    return(
        <Layout style={styles.container} level='1'>
            <Formik
                initialValues={{ phone: ''}}
                onSubmit={values => props.onPress(values)}
                validationSchema={props.validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
                    <View style={styles.container}>
                        <Input
                            style={styles.field}
                            placeholder='(613) 327-8306'
                            label='Phone Number'
                            value={values.phone}
                            textStyle={styles.textStyle}
                            onChangeText={handleChange('phone')}
                            size='large'
                        />
                        {errors.phone &&
                            <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start', marginTop: 2 }}>{errors.phone}</Text>
                        }
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