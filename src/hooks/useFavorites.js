import * as React from 'react';
import { showMessage } from 'react-native-flash-message';
import http from '../helpers/Http';
import { getCurrentUser } from '../helpers/Auth';

// Hearted product ids, shared by every screen so a heart flips everywhere at
// once. Loaded once per signed-in user; cleared when nobody is signed in.
let ids = new Set();
let loadedFor = null;
const listeners = new Set();
const emit = () => listeners.forEach((listener) => listener());

async function load() {
    const user = await getCurrentUser();
    if (!user) {
        ids = new Set();
        loadedFor = null;
        return emit();
    }
    if (loadedFor === user.id)
        return;
    const res = await http.get(`users/${user.id}/favorites`);
    ids = new Set(res.data.map((product) => product.id));
    loadedFor = user.id;
    emit();
}

export function useFavorites() {
    const [, rerender] = React.useReducer((n) => n + 1, 0);

    React.useEffect(() => {
        listeners.add(rerender);
        load().catch(() => {});
        return () => listeners.delete(rerender);
    }, []);

    // Flips the heart straight away and puts it back if the server says no.
    const toggle = async (product) => {
        const user = await getCurrentUser();
        if (!user)
            return showMessage({ message: 'Log in to save favorites.', type: 'info' });

        const was = ids.has(product.id);
        const flip = () => {
            ids = new Set(ids);
            ids.has(product.id) ? ids.delete(product.id) : ids.add(product.id);
            emit();
        };
        flip();
        try {
            if (was)
                await http.delete(`users/${user.id}/favorites/${product.id}`);
            else
                await http.post(`users/${user.id}/favorites`, { product_id: product.id });
        } catch (error) {
            flip();
            showMessage({ message: error.message, type: 'danger' });
        }
    };

    return { isFavorite: (id) => ids.has(id), toggle };
}
