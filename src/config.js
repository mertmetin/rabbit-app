// Google Maps key for Places autocomplete and directions; set in .env.
export const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// "Continue with Google": the iOS OAuth client ID from Google Cloud. The
// button is hidden while it's empty.
export const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '';

// Chatwoot live chat in Help: the Website inbox's token and the Chatwoot
// address (Chatwoot Cloud unless self-hosted). Hidden while the token is empty.
export const CHATWOOT_WEBSITE_TOKEN = process.env.EXPO_PUBLIC_CHATWOOT_WEBSITE_TOKEN || '';
export const CHATWOOT_BASE_URL = process.env.EXPO_PUBLIC_CHATWOOT_BASE_URL || 'https://app.chatwoot.com';

// Where Help sends customers; set in .env. Contact rows are hidden while empty.
export const SUPPORT_EMAIL = process.env.EXPO_PUBLIC_SUPPORT_EMAIL || '';
export const SUPPORT_PHONE = process.env.EXPO_PUBLIC_SUPPORT_PHONE || '';

// Shown on the map when the device location isn't available (downtown Ottawa).
// Orders below this total (in dollars) can't be placed.
export const MIN_ORDER = 20;
// Delivery pricing shown in Help; checkout always uses the server's quote.
export const DELIVERY_FEE = 3.99;
export const FREE_DELIVERY_OVER = 40;

export const DEFAULT_LOCATION = { latitude: 45.4215, longitude: -75.6972 };
