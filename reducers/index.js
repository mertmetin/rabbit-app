import { combineReducers } from 'redux'
import cartItems from './cartItems'
import deliveryAddress from './deliveryAddress'
import store from './store'

export default combineReducers({
    cartItems,
    deliveryAddress,
    store
})
