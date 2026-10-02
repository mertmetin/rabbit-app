import * as React from 'react';
import http from '../helpers/Http';
import { getCurrentUser } from '../helpers/Auth';

// Whether the next order is the customer's first (its delivery is free):
// true or false when signed in, null for guests or while unknown.
// Checked again each time a new basket is started.
export function useFirstOrder(hasBasket) {
    const [firstOrder, setFirstOrder] = React.useState(null);

    React.useEffect(() => {
        if (!hasBasket)
            return;
        let current = true;
        (async () => {
            const user = await getCurrentUser();
            if (!user)
                return current && setFirstOrder(null);
            const res = await http.get('user');
            if (current) setFirstOrder(res.data.first_order);
        })().catch(() => {});
        return () => { current = false; };
    }, [hasBasket]);

    return firstOrder;
}
