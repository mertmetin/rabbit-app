import { jwtDecode } from 'jwt-decode';
import Token from './Token';

// The signed-in user from the stored login token, or null if signed out/expired.
export async function getCurrentUser() {
    const token = await Token.getToken();
    if (!token)
        return null;

    try {
        const user = jwtDecode(token);
        return Date.now() < user.exp * 1000 ? user : null;
    } catch {
        return null;
    }
}
