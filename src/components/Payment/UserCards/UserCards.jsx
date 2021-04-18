import React, { useEffect, useState } from 'react';
import http from '../../../helpers/Http';

import { showMessage, hideMessage } from "react-native-flash-message";
import { UserCardsList } from './UserCardsList';

export const UserCards = ({ user_id, shouldFetch, setShouldFetch }) => {
    const [creditCards, setCreditCards] = useState(false);

    const deleteHandler = (payment_method_id) => {
        http.delete(`payment/methods/${payment_method_id}`)
        .then(res => {
            showMessage({
                message: 'Credit card removed successfully.',
                type: "success"
            });
            setShouldFetch(true);
        }).catch(error => {
            showMessage({
                message: 'Unable to remove the card.',
                type: "danger"
            });
        })
    }

    useEffect(() => {
        http.get(`payment/methods?user_id=${user_id}`)
        .then(result => {
            setCreditCards(result.data)
            setShouldFetch(false);
        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }, [shouldFetch]);

    return (
        <>
            { creditCards && <UserCardsList creditCards={creditCards} 
                deleteHandler={deleteHandler} /> }
        </>
    )
}