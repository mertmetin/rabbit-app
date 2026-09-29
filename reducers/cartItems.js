// Cart: products by id, quantity by id, and the running total in dollars.
// Every action returns new objects so connected screens re-render.
const initialState = {
    totalCost: 0,
    items: {},
    quantity: {}
}

const total = (items, quantity) =>
    Math.round(Object.keys(items).reduce((sum, id) => sum + items[id].price * quantity[id], 0) * 100) / 100;

const withQuantity = (state, item, quantity) => {
    const items = { ...state.items };
    const quantities = { ...state.quantity };

    if (quantity > 0) {
        items[item.id] = items[item.id] || item;
        quantities[item.id] = quantity;
    } else {
        delete items[item.id];
        delete quantities[item.id];
    }

    return { items, quantity: quantities, totalCost: total(items, quantities) };
}

const cartItems = (state = initialState, action) => {
    const item = action.payload;

    switch (action.type) {
        case 'ADD_TO_CART':
            return withQuantity(state, item, state.quantity[item.id] || 1);
        case 'INCREASE_ITEM_QUANTITY':
            return withQuantity(state, item, (state.quantity[item.id] || 0) + 1);
        case 'DECREASE_ITEM_QUANTITY':
            return withQuantity(state, item, (state.quantity[item.id] || 0) - 1);
        case 'REMOVE_FROM_CART':
            return withQuantity(state, item, 0);
        case 'CLEAR_CART':
            return initialState;
    }

    return state;
}

export default cartItems;
