import axios from 'axios';
import React from 'react';

import { PlaceAutocompleteInput } from './PlaceAutocompleteInput';

export const PlaceAutocomplete = ({ onAddressSelected }) => {
    const [predictions, setPredictions] = React.useState([]);

    const changeHandler = (searchTerm) => {
        const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?' +
            'key=***REMOVED***&' +
            '&input=' + searchTerm + 
            '&inputtype=textquery' +
            '&fields=formatted_address,name,rating,opening_hours'; 

        axios.get(url).then(result => {
            setPredictions(result.data.predictions);
        }).catch(error => {
            showMessage({
                message: error.message,
                type: "danger"
            });
        })
    }
    return (
        <PlaceAutocompleteInput 
            predictions={predictions} 
            changeHandler={changeHandler}
            onAddressSelected={onAddressSelected}
        />
    );
}