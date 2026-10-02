import * as React from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';

const COLORS = [theme.accent, '#ff6b6b', '#4dabf7', '#ffffff', '#69db7c', '#f783ac'];

// One burst of confetti from its parent, arcing up and falling back with a
// fade. `big` is the free-delivery celebration: three waves from three points
// along the bar, more and larger pieces, flying higher.
function makeBurst(big) {
    const count = big ? 150 : 28;
    return Array.from({ length: count }, (_, i) => {
        const wave = big ? i % 3 : 0;
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * (big ? 1.3 : 1.1);
        const speed = (big ? 420 : 190) * (0.45 + Math.random() * 0.65);
        return {
            key: `${Date.now()}-${i}`,
            x: big ? [-110, 0, 110][Math.floor(Math.random() * 3)] : 0,
            dx: Math.cos(angle) * speed,
            peak: Math.sin(angle) * speed,
            fall: big ? 160 : 70,
            spin: (Math.random() - 0.5) * (big ? 1080 : 720),
            size: big ? 6 + Math.random() * 8 : 5 + Math.random() * 4,
            round: Math.random() < 0.4,
            color: COLORS[i % COLORS.length],
            delay: wave * 280,
            t: new Animated.Value(0),
        };
    });
}

export function Fireworks({ trigger }) {
    const [pieces, setPieces] = React.useState([]);

    React.useEffect(() => {
        if (!trigger) return;
        const burst = makeBurst(trigger.big);
        setPieces(burst);
        Animated.parallel(burst.map((p) =>
            Animated.timing(p.t, {
                toValue: 1,
                duration: trigger.big ? 1900 : 1100,
                delay: p.delay,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
        )).start(() => setPieces([]));
    }, [trigger]);

    if (pieces.length === 0) return null;
    return (
        <View pointerEvents="none" style={styles.origin}>
            {pieces.map((p) => (
                <Animated.View
                    key={p.key}
                    style={[
                        styles.piece,
                        {
                            left: p.x,
                            width: p.size,
                            height: p.round ? p.size : p.size * 1.8,
                            borderRadius: p.round ? p.size / 2 : 1,
                            backgroundColor: p.color,
                            opacity: p.t.interpolate({ inputRange: [0, 0.75, 1], outputRange: [1, 1, 0] }),
                            transform: [
                                { translateX: p.t.interpolate({ inputRange: [0, 1], outputRange: [0, p.dx] }) },
                                { translateY: p.t.interpolate({ inputRange: [0, 0.45, 1], outputRange: [0, p.peak, p.peak + p.fall] }) },
                                { rotate: p.t.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${p.spin}deg`] }) },
                            ],
                        },
                    ]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    origin: { position: 'absolute', left: '50%', top: 24, width: 0, height: 0, zIndex: 10 },
    piece: { position: 'absolute' },
});
