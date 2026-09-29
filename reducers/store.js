// The store that delivers to the current location. `checked` turns true once
// we've asked the server, so screens can tell "loading" from "no store nearby".
const initialState = {
    store: null,
    checked: false
}

const store = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STORE':
            return { store: action.payload, checked: true };
        case 'RESET_STORE':
            return initialState;
    }

    return state;
}

export default store;
