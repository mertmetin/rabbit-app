import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, List, ListItem } from '@ui-kitten/components';

import { Add as AddIcon } from '@/icons';
import { getAddressIconByType } from '@/utils/address';
import { ADDRESS_HOME, ADDRESS_WORK, ADDRESS_OTHER} from '@/constants';

const data = [
    {
        title: 'Add home address',
        type: ADDRESS_HOME,
    },
    {
        title: 'Add work address',
        type: ADDRESS_WORK,
    },
    {
        title: 'Add other address',
        type: ADDRESS_OTHER,
    }
];

export const UserAddressOptions = ({ submitHandler }) => {
    const renderItemAccessory = () => <AddIcon color={'#3154fe'} style={styles.icon} size={24} />

    // ListItem passes style props to its title, so it must be a real View.
    const getAddressTitle = (item) => (props) => (
        <View style={[props?.style, styles.title]}>
            {getAddressIconByType(item.type)}
            <Text style={styles.titleBold}> | </Text>
            <Text>{item.title}</Text>
        </View>
    );

    const renderItem = ({ item, index }) => (
        <ListItem
            key={index}
            title={getAddressTitle(item)}
            accessoryRight={renderItemAccessory}
            onPress={() => submitHandler(item)}
        />
    );

    return (
        <List
            style={styles.container}
            data={data}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
            scrollEnabled={false}
        />
    )
}

const styles = StyleSheet.create({
    textDisabled: {
        color: '#919293'
    },
    icon: {
        paddingRight: 15
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleBold: {
        fontSize: 20, 
        fontWeight: '200',
    }
});