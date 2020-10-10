import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as React from 'react';
import axios from 'axios';
import { FloatingLabel } from './FloatingLabel'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { InstantSearch, connectSearchBox, connectHits, Hits, InfiniteHits} from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch/lite';
import { ScrollView } from 'react-native-gesture-handler';
import { CategoryCard } from '../components/CategoryCard';

export function Search(props) { 
    const searchClient = algoliasearch(
        'TJEJH855OJ',
        '00f441614d17af1d361059d44b691129'
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

    const CustomHits = connectHits(Hits);
    const ConnectedSearchBox = connectSearchBox(SearchBox);

    return(
        <ScrollView style={styles.container}>
            <InstantSearch
                searchClient={searchClient}
                indexName="products">
                <ConnectedSearchBox autoFocus />
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                    <CustomHits />
                </View>
            </InstantSearch>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
});