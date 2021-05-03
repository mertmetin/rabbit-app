import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Input, Spinner } from '@ui-kitten/components';

import { AutocompletePopper } from '@/components/AutocompletePopper';
import { Search, Location } from '@/icons';

const SearchIcon = () => <Search size={24} />
const LocationIcon = () => <Location size={24} />

export const PlaceAutocompleteInput = ({ predictions, setSearchTerm, onAddressSelected, isSearching }) => {
    const handleLeftIcon = () => isSearching ? <Spinner size={'small'} /> : <SearchIcon />;

    return (
        <>
            <Input
                style={styles.field}
                placeholder='Search Address'
                textStyle={styles.textStyle}
                onChangeText={(text) => setSearchTerm(text)}  
                accessoryLeft={handleLeftIcon}
                size='large'
            />
            {predictions && 
                <View style={styles.popperContainer}>
                    <AutocompletePopper 
                        data={predictions}
                        leftIcon={LocationIcon} 
                        onItemSelected={onAddressSelected}  
                    />
                </View>
            }
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
    popperContainer: {
        width: '100%',
        position: 'absolute',
        zIndex: 500,
        top: 100
    }
});