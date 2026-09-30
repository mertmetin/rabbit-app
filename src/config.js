// Google Maps key for Places autocomplete and directions; set in .env.
export const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// Where Help sends customers; set in .env. Contact rows are hidden while empty.
export const SUPPORT_EMAIL = process.env.EXPO_PUBLIC_SUPPORT_EMAIL || '';
export const SUPPORT_PHONE = process.env.EXPO_PUBLIC_SUPPORT_PHONE || '';

// Shown on the map when the device location isn't available (downtown Ottawa).
// Orders below this total (in dollars) can't be placed.
export const MIN_ORDER = 20;

export const DEFAULT_LOCATION = { latitude: 45.4215, longitude: -75.6972 };
