// Google Maps key for Places autocomplete and directions; set in .env.
export const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// Shown on the map when the device location isn't available (downtown Ottawa).
export const DEFAULT_LOCATION = { latitude: 45.4215, longitude: -75.6972 };
