import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { PlaceAutocompleteInput } from './PlaceAutocompleteInput';

const TIMER_DELAY_MS = 1000;
const MIN_INPUT_LENGTH = 4;

export const PlaceAutocomplete = ({ onAddressSelected }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [timer, setTimer] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const shouldSearch = searchTerm.length > MIN_INPUT_LENGTH;

    const getAutocompleteSuggestions = () => {
        const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?' +
            'key=***REMOVED***&' +
            '&input=' + searchTerm + 
            '&inputtype=textquery' +
            '&fields=formatted_address,name,rating,opening_hours'; 

        setIsSearching(true);

        axios.get(url).then(result => {
            setPredictions(result.data.predictions);
            setIsSearching(false);
        }).catch(error => {
            showMessage({
                message: error.message,
                type: "danger"
            });
        });
    }

    useEffect(() => {
        setTimer(setTimeout(() => {
            clearTimeout(timer); 
            setTimer(setTimeout(() => {    
                if (shouldSearch)
                    getAutocompleteSuggestions(searchTerm);
                else
                    setPredictions([]);
                }, TIMER_DELAY_MS));
        }));
    }, [searchTerm])

    return (
        <PlaceAutocompleteInput 
            predictions={predictions} 
            setSearchTerm={setSearchTerm}
            onAddressSelected={onAddressSelected}
            isSearching={isSearching}
        />
    );
}