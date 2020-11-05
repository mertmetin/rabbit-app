import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList  } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CategoryCard } from '../CategoryCard';
import http from '../../helpers/Http';

export function CategoriesList(props) {
    const category = props.category;
    const [list, setList] = React.useState([]);
    const [subList, setSubList] = React.useState([]);
    const [selected, setSelected] = React.useState(new Map());
    const [categories, setCategories] = React.useState([]);
    const [subCategories, setSubCategories] = React.useState([]);
    const navigation = useNavigation();

    const onSelect = React.useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));
            setSelected(newSelected);
        },
        [selected],
    );

    const Item = ({item, selected, onSelect}) => {
        var listContainerStyle = styles.listContainer;
        var listTextStyle = styles.text;

        if (category == item.id)
        {
            listContainerStyle = StyleSheet.flatten([styles.listContainer,
            styles.listContainerSelected]);
            listTextStyle = StyleSheet.flatten([styles.text,
            styles.textSelected]);
        }

        const onPress = () => {                
            navigation.push('Products', {item: item});
        }

        return(
            <View>
                <TouchableOpacity onPress={onPress} style={listContainerStyle}> 
                    <Text style={listTextStyle}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const SubItem = ({ item, selected, onSelect }) => {
        var sublistContainerStyle = styles.sublistContainer;
        var sublistTextStyle = styles.sublistText;

        const onPress = () => {
            navigation.push('Products', { item: item });
        }

        return (
            <View>
                <TouchableOpacity style={sublistContainerStyle}>
                    <Text style={sublistTextStyle}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    React.useEffect(() => {
        http.post('getProductCategories', { 
            withSubCategories: true }
        )
        .then(res => {
            if (!res.data)
                return;

            setList(res.data);

            const data = res.data;
            var categories = [];
            var subCategories = [];

            for (let k in data)
            {
                var cat = data[k];
                var catId = cat.category_id;

                if (!catId)
                    categories.push(cat);
                else if (catId == category)
                    subCategories.push(cat);
            }

            setCategories(categories);
            setSubCategories(subCategories);

            // makeItems(res.data);
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
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.list}
                data={categories}
                renderItem={({ item, onSelect }) => (
                    <Item
                        item= {item}
                        selected={!!selected.get(item.id)}
                        onSelect={onSelect}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                horizontal={true}   
                extraData={selected}
            />
            <FlatList
                style={styles.subList}
                data={subCategories}
                renderItem={({ item, onSelect }) => (
                    <SubItem
                        item={item}
                        selected={!!selected.get(item.id)}
                        onSelect={onSelect}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
            />
        </SafeAreaView>
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        overflow: 'visible'
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
        color: '#00754a',
        marginRight: 10,

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