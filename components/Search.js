import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as React from 'react';
import axios from 'axios';
import { FloatingLabel } from './FloatingLabel'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import {
    InstantSearch, connectSearchBox, connectHits, Hits, InfiniteHits, RefinementList
} from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch/lite';
import { ScrollView } from 'react-native-gesture-handler';
import { CategoryCard } from '../components/CategoryCard';

export function Search(props) { 
    console.log(props);
    const searchClient = algoliasearch(
        'TJEJH855OJ',
        '4c62c3aa3ade23a3d65355440835f0bf'
    );

    const SearchBox = (props) => {
        return (
        <View>
            <FloatingLabel
                placeholder="Search a product" value={props.currentRefinement} onTextChange={text => props.refine(text)}
            />
        </View>);
    }


    const Hits = (data) => {
        const storeId = props.store.id;
        const hits = data.hits;
        var items = [];

        for (let k in hits)
        {
            var hit = hits[k];

            if (hit.store_id != storeId)
                continue;

            var item = (
                <CategoryCard key={hit.id} routeName={'ProductDetails'} item={hit} />
            );
            items.push(item);
        }
        
        return items;
    };


    const CustomHits = connectHits(Hits);
    const ConnectedSearchBox = connectSearchBox(SearchBox);
    

    return(
        <ScrollView style={styles.container}>
            <InstantSearch
                searchClient={searchClient}
                indexName="store_products">
                <ConnectedSearchBox autoFocus />
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {props.store && <CustomHits />}
                </View>
            </InstantSearch>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});