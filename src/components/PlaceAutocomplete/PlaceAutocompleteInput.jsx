import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, Text, List, ListItem, Divider } from '@ui-kitten/components';

import { AutocompletePopper } from '@/components/AutocompletePopper';
import { Search as SearchIcon } from '@/icons';
import { Location as LocationIcon } from '@/icons';

export const PlaceAutocompleteInput = ({ searchTerm, setSearchTerm, predictions, changeHandler, onAddressSelected }) => {
    const SearchIcon = () => <SearchIcon size={24} />
    const locationIcon = <LocationIcon size={24} />

    return (
        <>
            <Input
                style={styles.field}
                placeholder='Search Address'
                value={searchTerm}
                textStyle={styles.textStyle}
                onChangeText={(e) => {
                    setSearchTerm(e);
                    changeHandler(e);
                }}
                accessoryLeft={SearchIcon}
                size='large'
            />
            <AutocompletePopper 
                data={predictions}
                leftIcon={locationIcon} 
                onItemSelected={onAddressSelected}  
            />
        </>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontWeight: '600'
    },
    field: {
        backgroundColor: '#fff',
        borderColor: '#fff'
    },
});