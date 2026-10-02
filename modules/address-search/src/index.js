import { Platform } from 'react-native';
import { requireOptionalNativeModule } from 'expo';

// Apple Maps address search (iOS). Missing in Expo Go and on other platforms,
// where it reports itself unavailable and the form works without suggestions.
const native = Platform.OS === 'ios' ? requireOptionalNativeModule('AddressSearch') : null;

export const addressSearchAvailable = !!native;

// Up to 6 suggestions, each { title: '382 Brant St', subtitle: 'Ottawa ON, Canada' }.
export function searchAddresses(query) {
    return native ? native.search(query) : Promise.resolve([]);
}

// The full address for a suggestion:
// { address_line_1, city, zone_code, postal_code, latitude, longitude }.
export function resolveAddress(suggestion) {
    return native.resolve(suggestion.title, suggestion.subtitle);
}
