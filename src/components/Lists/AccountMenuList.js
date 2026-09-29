import React from 'react';
import { StyleSheet, ScrollView, SectionList, View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider, List, ListItem, Menu, MenuItem, Avatar } from '@ui-kitten/components';

const data = [
    {
        id: 'addresses',
        title: 'Addresses',
        icon: 'location-outline',
        route: 'AddressScreen'
    },
    {
        id: 'payment-methods',
        title: 'Payment Methods',
        icon: 'card-outline',
        route: 'CardsScreen'
    },
    {
        id: 'change-password',
        title: 'Change Password',
        icon: 'lock-closed-outline',
        route: 'ChangePasswordScreen'
    },
    {
        id: 'logout',
        title: 'Logout',
        icon: 'exit-outline',
    }
]

export const AccountMenuList = (props) => {
    const user = props.user;
    const navigation = useNavigation();

    var userMenuData = [
        {
            id: 'name',
            title: user.name,
            icon: 'person-outline',
        },
        {
            id: 'email',
            title: user.email,
            icon: 'mail-outline',
        },
        {
            id: 'phone',
            title: user.phone,
            icon: 'phone-portrait-outline',
        }
    ]; 
    
    var versionData = [
        {
            id: 'version',
            title: 'Version: 1.0'
        }
    ];

    const ForwardIcon = (props) => {
        return <Ionicons size={24} name='chevron-forward' />
    };

    const renderItemIcon = (icon) => {
        return <Ionicons size={24} name={icon} />
    };

    const renderItem = ({ item, index }) => (
        <ListItem
            disabled={true} 
            key={index}
            title={item.title}
            accessoryLeft={() => {return renderItemIcon(item.icon)}}
        />
    );

    const renderItemOption = ({ item, index }) => (
        <ListItem
            key={index}
            title={item.title}
            accessoryLeft={() => { return renderItemIcon(item.icon) }}
            accessoryRight={ForwardIcon}
            onPress={() => {
                item.id == 'logout' ? props.logOut() : navigation.navigate(item.route, user);
            }}
        />
    );

    const renderItemPlain = ({item, index}) => (
        <ListItem
            key={"version"}
            disabled
            title={'Version: 1.0'}
            children={
                <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: '500' }}>Version</Text>
                    <Text style={{ fontWeight: '500', color: '#919293' }}>1.0</Text>
                </View>
            }
        />
    );

    var sections = [
        { title: 'User', data: [{ title: 'User', key: 'user', data: userMenuData, renderItem: renderItem}]},
        { title: 'OptionsMenu', data: [{ title: 'User Options', key: 'user-options', data: data, renderItem: renderItemOption }]},
        { title: 'Version', data: [{ title: 'Version ', key: 'version', data: versionData, renderItem: renderItemPlain }] }
    ];

    const renderList = (item) => {
        let list = item.section.data[0];

        return <List
            style={styles.box_shadow}
            data={list.data}
            renderItem={list.renderItem}
            keyExtractor={(item) => item.id}
        />
    }

    return (
        <View style={styles.container}>
            <SectionList 
                sections={sections}
                renderItem={renderList}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    box_shadow: {
        marginTop: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    text: {
        fontSize: 14.5,
        fontWeight: '500'
    }
});