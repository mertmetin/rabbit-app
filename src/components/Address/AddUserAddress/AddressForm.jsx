import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { Layout, Input, Button, Text, Card, IndexPath, Select, SelectItem } from '@ui-kitten/components';

import { Modal } from '@/components/Modal';

// import { Modal } from '../../Modals/Modal';

import { ErrorMessage } from '@/components/ErrorMessage';

export const AddressForm = ({ address, type, addAddress }) => {
    const [values, setValues] = React.useState();
    const [visible, setVisible] = React.useState(false);
    const initialValues = {
        address_line_1: address.address_line_1, 
        address_line_2: address.address_line_2,  
        label: type.charAt(0).toUpperCase() + type.slice(1), 
        notes: ''
    };

    const submitHandler = () => addAddress(values);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) =>  {
                setVisible(true);
                setValues({values, ...address});
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
                <View style={styles.container}>
                    {visible && <Modal 
                            visible={visible} 
                            setVisible={setVisible}
                            handleSubmit={submitHandler}
                            title={'Please confirm your address:'} 
                            description={values.address_line_1} 
                        /> 
                    }
                    <Input
                        style={styles.field}
                        placeholder='Label (e.g. Home, Work)'
                        value={values.label}
                        textStyle={styles.textStyle}
                        onChangeText={handleChange('label')}
                        size='large'
                    />
                    {errors.title && <ErrorMessage msg={errors.title} /> }
                    <Input
                        style={styles.field}
                        placeholder='Address'
                        value={values.address_line_1}
                        textStyle={styles.textStyle}
                        onChangeText={handleChange('address_line_1')}
                        size='large'
                    />
                    <View style={{flexDirection: 'row'}}>
                        <Input
                            style={{ width: '50%', paddingRight: 5 }}
                            placeholder='Apt / Suite / Floor'
                            value={values.address_line_2}
                            textStyle={styles.textStyle}
                            onChangeText={handleChange('address_line_2')}
                            size='large'
                        />
                        <Input
                            style={{width: '50%', paddingLeft: 5}}
                            placeholder='Notes'
                            value={values.notes}
                            textStyle={styles.textStyle}
                            onChangeText={handleChange('notes')}
                            size='large'
                        />
                    </View>
                    <Button onPress={handleSubmit} style={styles.button}>
                        Save
                    </Button>
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
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