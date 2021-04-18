import React from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { Layout, Input, Button, Text, Card, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from '@ui-kitten/components';
import Map from '../../Other/Map';
import { Modal } from '../../Modals/Modal';

const data = [
    'Home',
    'Work',
    'Other',
];

export const AddressForm = props => {
    var location = props.location;
    var indexPath = new IndexPath(0);
    const [modalDescription, setModalDescription] = React.useState(location.type);
    const [addressType, setAddressType] = React.useState(location.type);

    if (addressType == 'Home')
        indexPath = new IndexPath(0);
    else if (addressType == 'Work')
        indexPath = new IndexPath(1);
    else if (addressType == 'Other')
        indexPath = new IndexPath(2);

    const [selectedIndex, setSelectedIndex] = React.useState(indexPath);
    const [visible, setVisible] = React.useState(false);
    const [address_line_1, setAddressLine1] = React.useState('');
    const [address_line_2, setAddressLine2] = React.useState('');
    const [label, setLabel] = React.useState('');
    const [notes, setNotes] = React.useState('');
    const displayValue = data[selectedIndex.row];

    const onPress = () => {
        setVisible(true);
    }

    const onYesClick = () => {
        setVisible(false);
        location.label = label;
        location.notes = notes;
        location.address_line_1 = address_line_1;
        location.address_line_2 = address_line_2;
        location.address_type = data[selectedIndex.row];
        props.onPress(location);
    }

    const onNoClick = () => {
        setVisible(false);
    }

    return (
        <Formik
            initialValues={{ 
                address_type: addressType, label: '', 
                address_line_1: location.address_line_1, 
                address_line_2: location.address_line_2, 
                notes: ''
            }}
            onSubmit={(values) =>  {
                onPress();
                setAddressLine1(values.address_line_1);
                setAddressLine2(values.address_line_2);
                setAddressType(values.address_type);
                setLabel(values.label);
                setNotes(values.notes);

            }}
        >
            {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
                <View style={styles.container}>
                    {visible && <Modal title={'Please confirm your address:'} 
                        description={values.address_line_1}
                        onYesClick={onYesClick} 
                        onNoClick={onNoClick} />
                    }
                    <View style={{ flexDirection: 'row' }}>

                    <Select 
                        style={{ width: '50%', paddingRight: 5 }}
                        size='large'
                        selectedIndex={selectedIndex}
                        value={displayValue}
                        onSelect={index => setSelectedIndex(index)}>
                        <SelectItem title='Home' />
                        <SelectItem title='Work' />
                        <SelectItem title='Other' />
                    </Select>
                    <Input
                        style={{ width: '50%', paddingRight: 5 }}
                        // style={styles.field}
                        placeholder='Label (e.g. Home, Work)'
                        value={values.label}
                        textStyle={styles.textStyle}
                        onChangeText={handleChange('label')}
                        size='large'
                    />
                    </View>
                    {errors.title &&
                        <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start', marginTop: 2 }}>{errors.phone}</Text>
                    }
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
                    {/* <Input
                        style={styles.field}
                        placeholder='Notes'
                        value={values.notes}
                        textStyle={styles.textStyle}
                        onChangeText={handleChange('notes')}
                        size='large'
                    /> */}
                    <Button onPress={handleSubmit} style={styles.button} >
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