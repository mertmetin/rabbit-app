// Browser stand-in for @stripe/stripe-react-native, which only runs on iOS/Android.
export const StripeProvider = ({ children }) => children;

const unavailable = async () => ({ error: { code: 'Unavailable', message: 'Payments work in the phone app.' } });

export const useStripe = () => ({
    initPaymentSheet: unavailable,
    presentPaymentSheet: unavailable,
});
