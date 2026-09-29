import { combineReducers } from 'redux'
import cartItems from './cartItems'
import deliveryAddress from './deliveryAddress'

export default combineReducers({
    cartItems: cartItems,
    deliveryAddress: deliveryAddress
})