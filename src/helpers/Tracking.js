// Order statuses as customers see them.
export const ACTIVE = ['placed', 'preparing', 'ready', 'out_for_delivery'];

export const HEADLINE = {
    placed: { title: 'Order received', subtitle: "We've got your order." },
    preparing: { title: 'Picking your groceries', subtitle: "We're getting everything on your list." },
    ready: { title: 'All picked', subtitle: 'Heading your way shortly.' },
    out_for_delivery: { title: 'On the way', subtitle: 'Your driver is heading to you.' },
    delivered: { title: 'Delivered 🎉', subtitle: 'Enjoy your groceries!' },
    cancelled: { title: 'Cancelled', subtitle: "You weren't charged; the hold on your card is released." },
};

const rad = (d) => (d * Math.PI) / 180;
export function distanceKm(a, b) {
    const dLat = rad(b.latitude - a.latitude);
    const dLng = rad(b.longitude - a.longitude);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLng / 2) ** 2;
    return 2 * 6371 * Math.asin(Math.sqrt(h));
}

// Rough arrival estimate from the driver's position: city driving ~20 km/h
// on roads ~1.4x longer than a straight line, plus a minute to hand over.
export function etaMinutes(driver, destination) {
    if (!driver || !destination?.latitude) return null;
    const km = distanceKm(driver, destination) * 1.4;
    return Math.max(1, Math.round((km / 20) * 60 + 1));
}

export const destinationOf = (order) => {
    const a = order?.delivery_address;
    return a && a.latitude != null ? { latitude: Number(a.latitude), longitude: Number(a.longitude) } : null;
};

export const timeOf = (iso) => (iso ? new Date(iso).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' }) : null);
