import * as React from 'react';
import { Animated, Easing, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FLIGHT_MS = 650;
const Context = React.createContext(null);

// Product photos that fly from where you tapped into the basket.
// Basket buttons register where they are; `pulse` ticks each time something
// lands (or is added without a flight) so they can bounce at the right moment.
export function FlyToCartProvider({ children }) {
    const targets = React.useRef({});
    const tabVisible = React.useRef(true);
    const [flights, setFlights] = React.useState([]);
    const [pulse, setPulse] = React.useState(0);
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const nextId = React.useRef(0);

    const bump = React.useCallback(() => setPulse((p) => p + 1), []);

    const setTarget = React.useCallback((name, rect) => { targets.current[name] = rect; }, []);
    const setTabVisible = React.useCallback((visible) => { tabVisible.current = visible; }, []);

    // Centre of the basket button that's on screen right now.
    const destination = () => {
        const valid = (r) => r && r.width > 0;
        const { tab, header } = targets.current;
        const rect = (tabVisible.current && valid(tab) && tab) || (valid(header) && header);
        if (rect)
            return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
        return { x: width - 60, y: insets.top + 22 }; // where the header total appears
    };

    const fly = React.useCallback((image, from) => {
        if (!image || !from || !from.width) {
            bump();
            return;
        }
        setFlights((list) => [...list, { id: nextId.current++, image, from, to: destination() }]);
    }, [width, insets.top]);

    const land = React.useCallback((id) => {
        setFlights((list) => list.filter((f) => f.id !== id));
        bump();
    }, []);

    const value = React.useMemo(() => ({ fly, bump, pulse, setTarget, setTabVisible }), [fly, bump, pulse]);

    return (
        <Context.Provider value={value}>
            {children}
            <View pointerEvents="none" style={StyleSheet.absoluteFill}>
                {flights.map((flight) => <Flight key={flight.id} flight={flight} onDone={land} />)}
            </View>
        </Context.Provider>
    );
}

function Flight({ flight, onDone }) {
    const { image, from, to } = flight;
    const size = Math.min(from.width, from.height, 120);
    const startX = from.x + from.width / 2 - size / 2;
    const startY = from.y + from.height / 2 - size / 2;
    const dx = React.useRef(new Animated.Value(0)).current;
    const dy = React.useRef(new Animated.Value(0)).current;
    const shrink = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        // Sideways eases out while the drop eases in: together they trace an arc.
        Animated.parallel([
            Animated.timing(dx, { toValue: to.x - (startX + size / 2), duration: FLIGHT_MS, easing: Easing.out(Easing.quad), useNativeDriver: true }),
            Animated.timing(dy, { toValue: to.y - (startY + size / 2), duration: FLIGHT_MS, easing: Easing.in(Easing.back(1.6)), useNativeDriver: true }),
            Animated.timing(shrink, { toValue: 1, duration: FLIGHT_MS, easing: Easing.in(Easing.quad), useNativeDriver: true }),
        ]).start(() => onDone(flight.id));
    }, []);

    const scale = shrink.interpolate({ inputRange: [0, 0.15, 1], outputRange: [1, 1.08, 0.18] });
    const opacity = shrink.interpolate({ inputRange: [0, 0.85, 1], outputRange: [1, 1, 0.3] });

    return (
        <Animated.Image
            source={{ uri: image }}
            style={[
                styles.flight,
                { left: startX, top: startY, width: size, height: size, borderRadius: size / 5, opacity },
                { transform: [{ translateX: dx }, { translateY: dy }, { scale }] },
            ]}
        />
    );
}

export function useFlyToCart() {
    return React.useContext(Context) || { fly: () => {}, bump: () => {}, pulse: 0, setTarget: () => {}, setTabVisible: () => {} };
}

const styles = StyleSheet.create({
    flight: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
});
