import { useDispatch, useSelector } from 'react-redux';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { showMessage } from 'react-native-flash-message';

// Cart state plus actions. Adding more than the store has in stock is blocked.
export function useCart() {
    const cart = useSelector((state) => state.cartItems);
    const dispatch = useDispatch();

    const quantityOf = (id) => cart.quantity[id] || 0;
    const count = Object.values(cart.quantity).reduce((sum, n) => sum + n, 0);

    const increase = (product) => {
        const inStock = product.quantity;
        if (inStock !== undefined && quantityOf(product.id) >= inStock) {
            showMessage({ message: `Only ${inStock} left in stock.`, type: 'warning' });
            if (Platform.OS !== 'web')
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            return;
        }
        dispatch({ type: 'INCREASE_ITEM_QUANTITY', payload: product });
        // A light tap so adding to the basket feels physical.
        if (Platform.OS !== 'web')
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    return {
        items: cart.items,
        total: cart.totalCost,
        count,
        quantityOf,
        increase,
        decrease: (product) => dispatch({ type: 'DECREASE_ITEM_QUANTITY', payload: product }),
        remove: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
        clear: () => dispatch({ type: 'CLEAR_CART' }),
    };
}
