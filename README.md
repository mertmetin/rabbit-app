# Rabbit

**Grocery delivery in Ottawa: the customer app.** Pick a nearby store, fill a basket, pay with a saved card, and follow the order while a Rabbit driver shops it by hand and brings it to your door.

Part of [Rabbit](https://github.com/mertmetin/rabbit-server): [backend](https://github.com/mertmetin/rabbit-server) · **customer app** · [driver app](https://github.com/mertmetin/rabbit-driver) · [2021 API](https://github.com/mertmetin/rabbit-api)

## What you can do in the app

- **Sign in** with your phone number and a text code, or with Google. Browsing works without an account.
- **Shop the closest open store.** The home screen picks the nearest store that has a driver online and updates live (server-sent events) when a store opens or closes; if your nearest store is closed, it offers a farther one.
- **Browse and search** categories, product groups with options (size, flavour, fat %), popular items, promotions and favourites.
- **Basket:** quantity steppers, products that fly into the basket icon when added, recommendation cards, and a running total against the minimum order.
- **Checkout:** saved addresses (Google Places autocomplete), saved cards through **Stripe** (added with the Stripe payment sheet), a tip, and the real delivery fee and **estimated arrival time** from the backend. Your first delivery is free.
- **Pay for what was found:** the card is only authorised at checkout and charged after the driver shops, for exactly what they found.
- **Track the order** on a map with the driver's live location and status, get **push notifications** at each step, then rate the delivery and add to the tip.
- **Help:** in-app chat with support (Chatwoot), plus order history, account and payment settings.

## Engineering

- **Stack:** Expo SDK 57 (React Native, React 19), React Navigation 7 (tabs and stacks per section), Redux for the basket and session, Formik + Yup forms, UI Kitten components.
- **Maps and places:** `react-native-maps`, directions, Google Places autocomplete for addresses, and `expo-location` for the nearest store.
- **Payments:** `@stripe/stripe-react-native` with SetupIntents and the payment sheet; card details never touch Rabbit's servers.
- **Live updates:** `react-native-sse` for store status, Expo push notifications for order updates.
- **Web build:** runs in a browser through `react-native-web`, with small stubs for the native-only modules (maps, Stripe).
- **API:** a single HTTP client with friendly error messages, talking to the [backend](https://github.com/mertmetin/rabbit-server).

## History

This repo goes back to April 2020. The `master` branch and its feature and bug branches (merged through pull requests in 2021) are the first version of the app, which ran against the Laravel [rabbit-api](https://github.com/mertmetin/rabbit-api). `main` starts in September 2026: the app upgraded to Expo SDK 57, React 19 and React Navigation 7, moved onto the new TypeScript [backend](https://github.com/mertmetin/rabbit-server), and extended with live store status, real delivery-time estimates, authorise-then-charge payments, tips, push notifications and order tracking.

*API keys that were committed in early versions have been removed from this history and revoked.*

## Run locally

```bash
npm install
npx expo start                 # Expo dev server; the API defaults to the local backend on port 3000
npx expo run:ios               # development build (maps, Stripe and Google sign-in need native code)
npm test
```

Configuration lives in `.env` (`EXPO_PUBLIC_*`: API URL, Google Maps key, Stripe publishable key, Chatwoot website token, Google iOS client ID). Run the [backend](https://github.com/mertmetin/rabbit-server) locally with its seed data to get stores and products.
