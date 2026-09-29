// The saved address the user chose to deliver to (null = use device location).
const initialState = {
    address: null
}

const deliveryAddress = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DELIVERY_ADDRESS':
            return { address: action.payload };
        case 'REMOVE_DELIVERY_ADDRESS':
            return initialState;
    }

    return state;
}

export default deliveryAddress;
