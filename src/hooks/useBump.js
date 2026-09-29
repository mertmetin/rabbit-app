import * as React from 'react';
import { Animated } from 'react-native';

// A quick scale "pop" whenever `value` goes up (e.g. the basket total).
export function useBump(value) {
    const scale = React.useRef(new Animated.Value(1)).current;
    const previous = React.useRef(value);

    React.useEffect(() => {
        if (value > previous.current) {
            scale.setValue(1);
            Animated.sequence([
                Animated.spring(scale, { toValue: 1.18, speed: 40, bounciness: 12, useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, speed: 20, bounciness: 8, useNativeDriver: true }),
            ]).start();
        }
        previous.current = value;
    }, [value]);

    return scale;
}
