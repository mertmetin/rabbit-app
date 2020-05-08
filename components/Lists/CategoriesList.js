import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity  } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CategoryCard } from '../CategoryCard';
import http from '../../helpers/Http';

export function CategoriesList(props) {
    const category = props.category;
    const [list, setList] = React.useState([]);
    const [subList, setSubList] = React.useState([]);
    const navigation = useNavigation();

    const makeItems = (data) => {
        var items = [];
        var subItems = [];

        for (let k in data) {
            var cat = data[k];
           
            const onPress = () => {
                navigation.push('Products', { item: data[k] });
            }
                        
            if (cat.category_id == null)
            {   
                var listContainerStyle = styles.listContainer;
                var listTextStyle = styles.text;

                // If category is selected, show it differently.
                if (category == data[k].id) {
                    listContainerStyle = StyleSheet.flatten([styles.listContainer,
                    styles.listContainerSelected]);
                    listTextStyle = StyleSheet.flatten([styles.text,
                    styles.textSelected]);
                }

                var item = (
                    <View key={k} style={listContainerStyle}>
                        <TouchableOpacity onPress={onPress}>
                            <Text style={listTextStyle}>{cat.title}</Text>
                        </TouchableOpacity>
                    </View>
                );
                items.push(item);
            }
            else if (cat.category_id == category)
            {  
                var sublistContainerStyle = styles.sublistContainer;
                var sublistTextStyle = styles.sublistText;

                // If category is selected, show it differently.
                if (category == data[k].id) {
                    listContainerStyle = StyleSheet.flatten([styles.listContainer,
                    styles.listContainerSelected]);
                    listTextStyle = StyleSheet.flatten([styles.sublistTextStyle,
                        styles.sublistTextStyle]);
                }

                var subitem = (
                    <View key={k} style={listContainerStyle}>
                        <TouchableOpacity onPress={onPress}>
                            <Text style={sublistTextStyle}>{cat.title}</Text>
                        </TouchableOpacity>
                    </View>
                );
                subItems.push(subitem);
            }
        }

        setList(items);
        setSubList(subItems);
    }

    React.useEffect(() => {
        http.post('getProductCategories', {})
            .then(res => {
                if (!res.data)
                    return;

                makeItems(res.data);
            }).catch(error => {
                if (error.response) {
                    const msg = error.response.data.message;
                    showMessage({
                        message: msg,
                        type: "danger"
                    });
                }
            })
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.list}>
                {list}
            </View>
            <View style={styles.subList}>
                {subList}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: 20
    },
    list: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#00754a',
        flexDirection: 'row',  
        width: '100%',
    },
    subList: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,        
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    sublistContainerStyle: {

    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontFamily: 'sodo-sans-bold',
        padding: 5
    },
    sublistText: {
        fontSize: 16,
        fontFamily: 'sodo-sans-bold',
        color: '#00754a'
    },
    sublistTextSelected: {
        color: '#000'
    },
    textSelected: {
        color: '#00754a'
    },
    listContainer: {
        backgroundColor: 'transparent',
        marginRight: 10
    },
    listContainerSelected: {
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderRadius: 2,
    }
})