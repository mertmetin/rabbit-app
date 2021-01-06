import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider, List, ListItem, Menu, MenuItem, Avatar } from '@ui-kitten/components';

const data = [
    {
        title: 'Login',
        icon: 'person',
        route: 'SignIn'
    }
];

export const GuestMenuList = (props) => {
    const navigation = useNavigation();

    const ForwardIcon = (props) => {
        return <Ionicons size={24} name='chevron-forward' />
    };

    const menuItems = data.map((item, index) => {
        var icon = (props) => {
            return <Ionicons size={24} name={item.icon} />
        };

        var onPress = () => {
            navigation.navigate(item.route);
        }

        return (
            <React.Fragment>
                <MenuItem
                    title={item.title}
                    accessoryLeft={icon}
                    accessoryRight={ForwardIcon}
                    onPress={onPress}
                />
                <Divider />
            </React.Fragment>
        );
    });

    const version = (
        <View style={styles.container}>
            <ListItem
                disabled
                title={'Version: 1.0'}
                children={
                    <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: '500' }}>Version</Text>
                        <Text style={{ fontWeight: '500', color: '#919293' }}>1.0</Text>
                    </View>
                }
            />
        </View>
    );

    const optionsMenu = (
        <View style={styles.container}>
            {menuItems}
            {version}
        </View> 
    );

    return (
        <React.Fragment>
            {optionsMenu}
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        paddingBottom: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.10,
        shadowRadius: 1.84,

        elevation: 5
    },
    text: {
        fontSize: 14.5,
        fontWeight: '500'
    }
});