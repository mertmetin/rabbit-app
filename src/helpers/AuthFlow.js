import Token from './Token';

// Formats 10 digits as (613) 555-0100 while typing.
export function formatPhone(value) {
    const d = value.replace(/\D/g, '').replace(/^1(?=\d{10})/, '').slice(0, 10);
    if (d.length < 4) return d;
    if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

// Stores the session and continues where the customer was headed.
export async function finishSignIn(navigation, token, returnTo) {
    await Token.setToken(token);
    if (returnTo === 'Checkout') {
        navigation.popToTop();
        navigation.navigate('Root', { screen: 'Cart', params: { screen: 'Checkout' } });
    } else {
        navigation.popToTop();
    }
}
