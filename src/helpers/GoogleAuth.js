import { Platform } from 'react-native';
import { GOOGLE_IOS_CLIENT_ID } from '../config';

// "Continue with Google" on iOS. Shown only when the app has a Google client ID
// (and was built with the Google Sign-In module, which Expo Go doesn't have).
export const googleSignInAvailable = Platform.OS === 'ios' && !!GOOGLE_IOS_CLIENT_ID;

// Google's ID token for the server, or null if the customer cancelled.
export async function getGoogleIdToken() {
    // Loaded here so screens still open in builds without the native module.
    const { GoogleSignin, isSuccessResponse } = require('@react-native-google-signin/google-signin');
    GoogleSignin.configure({ iosClientId: GOOGLE_IOS_CLIENT_ID });
    const response = await GoogleSignin.signIn();
    if (!isSuccessResponse(response)) return null;
    return response.data.idToken;
}
