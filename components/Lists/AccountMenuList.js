import React from 'react';
import { StyleSheet, ScrollView, View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider, List, ListItem, Menu, MenuItem, Avatar } from '@ui-kitten/components';

const data = [
    {
        title: 'Addresses',
        icon: 'location-outline',
        route: 'AddressScreen'
    },
    {
        title: 'Payment Methods',
        icon: 'card-outline',
        route: 'CardsScreen'
    },
    {
        title: 'Change Password',
        icon: 'lock-closed-outline',
        route: 'ChangePasswordScreen'
    }
]

export const AccountMenuList = (props) => {
    const user = props.user;
    const navigation = useNavigation();

    const ForwardIcon = (props) => {
        return <Ionicons size={24} name='chevron-forward' />
    };

    var EmailIcon = (props) => (
        <Ionicons size={24} name='mail-outline' />
    );

    var PersonIcon = (props) => (
        <Ionicons size={24} name='person-outline' />
    );

    var PhoneIcon = (props) => (
        <Ionicons size={24} name='phone-portrait-outline' />
    );

    var Exit = (props) => (
        <Ionicons size={24} name={'exit-outline'} />
    );

    const topMenu = (
        <View style={styles.container}>
            <ListItem
                disabled
                title={user.name}
                accessoryLeft={PersonIcon}
            />
            <Divider />
            <ListItem
                disabled
                title={user.email}
                accessoryLeft={EmailIcon}
            />
            <Divider />
            <ListItem
                disabled
                title={user.phone}
                accessoryLeft={PhoneIcon}
            />
        </View>
    );

    const menuItems = data.map((item, index) => {
        var icon = (props) => {
            return <Ionicons size={24} name={item.icon} />
        };

        var onPress = () => {
            navigation.navigate(item.route, user);
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

    const logOut = () => {
        props.logOut();
    };

    const optionsMenu = (
        <View style={styles.container}>
            {menuItems}
            <MenuItem
                title={'Logout'}
                accessoryLeft={Exit}
                accessoryRight={ForwardIcon}
                onPress={logOut}
            />
            <Divider />
        </View>
    )

    const version = (
        <View style={styles.container}>
            <ListItem
                disabled
                title={'Version: 1.0'}
                children= {
                    <View style={{paddingLeft:10, paddingRight: 10, flexDirection: 'row', width:'100%', justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: '500'}}>Version</Text>
                        <Text style={{ fontWeight: '500', color: '#919293'}}>1.0</Text>
                    </View>
                }
            />
        </View>
    );

    return (
        <ScrollView>
            {topMenu}
            {optionsMenu}
            {version}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
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