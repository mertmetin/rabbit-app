import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as React from 'react';
import { FloatingLabel } from './FloatingLabel'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CategoryCard } from '../components/CategoryCard';
import http from '../helpers/Http';
import { useSelector } from 'react-redux';

export function Search(props) { 
    const [hits, setHits] = React.useState();

    const SearchBox = (props) => {
        return (
        <View>
            <FloatingLabel
                placeholder="Search a product" value={props.currentRefinement}
                    onTextChange={text => props.refine(text)}
            />
        </View>);
    }

    const Hits = (data) => {
        // const storeId = props.store.id;
        const hits = data.hits;
        var items = [];

        for (let k in hits)
        {
            var hit = hits[k];
            var item = (
                <CategoryCard key={hit.id} routeName={'ProductDetails'} item={hit} />
            );
            items.push(item);

        }
        
        return items;
    };

    const store = useSelector((state) => state.store.store);

    const onTextChange = (text) => {
        if (text.length < 2 || !store)
        {
            setHits([]);
            return;
        }

        http.get('search', { params: { store_id: store.id, q: text } })
        .then((response) => {
            var hits = Hits(response.data);
            setHits(hits);
        })
        .catch(() => setHits([]));
    }
    

    return(
        <ScrollView style={styles.container}>
            <FloatingLabel
                placeholder="Search a product" value={props.currentRefinement}
                onTextChange={onTextChange}
            />
            {hits}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});