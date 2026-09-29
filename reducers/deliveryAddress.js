const initialState = {
    address: {}
}

const deliveryAddress = (state = initialState, action) => {
    let item;
    let itemId;

    switch (action.type) {
        case 'SET_DELIVERY_ADDRESS':
            state = [];
            item = action.payload;
            state[item.id] = item;

            return { ...state };
        case 'REMOVE_DELIVERY_ADDRESS':
        
            return { ...state };
    }

    return state;
}

export default deliveryAddress;