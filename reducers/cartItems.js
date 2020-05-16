const initialState = {
    totalCost: 0.0,
    items: {},      
    quantity: {}
}

const cartItems = (state = initialState, action) => {
    let item;
    let itemId;

    switch (action.type)
    {
        case 'ADD_TO_CART':
            item = action.payload;
            itemId = item.id;

            if (!state.items[itemId])
                state.items[itemId] = item;

            if (!state.quantity[itemId])
                state.quantity[itemId] = 1;

            state.totalCost = state.totalCost + item.price;

            return {...state};
        case 'INCREASE_ITEM_QUANTITY':
            item = action.payload;
            itemId = item.id;

            state.quantity[itemId] = state.quantity[itemId] + 1;

            return { ...state };
        case 'DECREASE_ITEM_QUANTITY':
            item = action.payload;
            itemId = item.id;
            state.quantity[itemId] = state.quantity[itemId] - 1;
            let totalQuantity = state.quantity[itemId];

            if (totalQuantity == 0)
            {
                delete state.items[itemId];
                delete state.quantity[itemId];
            }

            return { ...state };
        case 'REMOVE_FROM_CART':
            item = action.payload;
            itemId = item.id;

            return state.filter(cartItem => cartItem.id !== action.payload.id)
    }

    return state;
}

export default cartItems;