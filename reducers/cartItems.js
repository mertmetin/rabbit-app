const initialState = {
    totalCost: 0.0,
    items: {},      
    quantity: {}
}

const cartItems = (state = initialState, action) => {
    switch (action.type)
    {
        case 'ADD_TO_CART':
            const item = action.payload;
            const itemId = item.id;

            if (!state.items[itemId])
                state.items[itemId] = item;

            if (!state.quantity[itemId])
                state.quantity[itemId] = 1;

            state.totalCost = state.totalCost + item.price;

            return state;
        case 'INCREASE_ITEM_QUANTITY':
            const product = action.payload;
            const productId = product.id;

            state.quantity[productId] = state.quantity[productId] + 1;

            // console.log(state);

            return state;
        case 'DECREASE_ITEM_QUANTITY':
            const pro = action.payload;
            const proId = pro.id;

            state.quantity[proId] = state.quantity[proId] - 1;
            // console.log(state);

            return state;
        case 'REMOVE_FROM_CART':
            return state.filter(cartItem => cartItem.id !== action.payload.id)
    }

    return state;
}

export default cartItems;