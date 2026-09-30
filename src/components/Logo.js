import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Ellipse, G, Line, Path } from 'react-native-svg';
import { theme } from '../theme';

const BLUSH = '#f6c3c3'; // inner ear and cheeks

// The leaping rabbit winking at you, with speed lines (same drawing as
// assets/images/logo-mark.svg).
export function LogoMark({ size = 36, color = theme.white, eye = theme.primary }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 512 512">
            <G transform="translate(34 6)">
                <G stroke={theme.accent} strokeWidth={22} strokeLinecap="round">
                    <Line x1="34" y1="252" x2="112" y2="252" />
                    <Line x1="58" y1="306" x2="108" y2="306" />
                    <Line x1="30" y1="360" x2="94" y2="360" />
                </G>
                <G fill={color}>
                    <Ellipse cx="168" cy="372" rx="72" ry="21" transform="rotate(-20 168 372)" />
                    <Ellipse cx="262" cy="318" rx="112" ry="60" transform="rotate(-12 262 318)" />
                    <Circle cx="156" cy="304" r="26" />
                    <Ellipse cx="382" cy="362" rx="50" ry="17" transform="rotate(26 382 362)" />
                    <Ellipse cx="302" cy="146" rx="21" ry="78" transform="rotate(-46 302 146)" />
                    <Ellipse cx="340" cy="128" rx="21" ry="76" transform="rotate(-24 340 128)" />
                    <Circle cx="352" cy="238" r="76" />
                </G>
                <Ellipse cx="342" cy="124" rx="9" ry="52" transform="rotate(-24 342 124)" fill={BLUSH} />
                <Circle cx="324" cy="232" r="14" fill={eye} />
                <Circle cx="329" cy="227" r="5" fill={color} />
                <Path d="M366 236 q16 -14 32 0" fill="none" stroke={eye} strokeWidth={8} strokeLinecap="round" />
                <Ellipse cx="306" cy="262" rx="12" ry="7" fill={BLUSH} />
                <Ellipse cx="398" cy="262" rx="12" ry="7" fill={BLUSH} />
                <Ellipse cx="352" cy="258" rx="9" ry="6.5" fill={theme.accent} />
                <Path d="M338 270 q14 14 28 0" fill="none" stroke={eye} strokeWidth={6} strokeLinecap="round" />
            </G>
        </Svg>
    );
}

// The original logo (assets/images/logo-mark-classic.svg), kept in case we go back.
export function LogoMarkClassic({ size = 36, color = theme.white, eye = theme.primary }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 512 512">
            <G stroke={theme.accent} strokeWidth={20} strokeLinecap="round">
                <Line x1="44" y1="236" x2="118" y2="236" />
                <Line x1="64" y1="288" x2="104" y2="288" />
                <Line x1="40" y1="340" x2="96" y2="340" />
            </G>
            <G fill={color} transform="translate(-14 6)">
                <Ellipse cx="318" cy="150" rx="19" ry="74" transform="rotate(-58 318 150)" />
                <Ellipse cx="296" cy="176" rx="16" ry="66" transform="rotate(-72 296 176)" />
                <Ellipse cx="178" cy="346" rx="72" ry="22" transform="rotate(-18 178 346)" />
                <Ellipse cx="272" cy="296" rx="112" ry="62" transform="rotate(-14 272 296)" />
                <Circle cx="164" cy="286" r="26" />
                <Circle cx="370" cy="228" r="54" />
                <Ellipse cx="382" cy="336" rx="50" ry="17" transform="rotate(24 382 336)" />
            </G>
            <Circle cx="374" cy="222" r="8" fill={eye} />
            <Circle cx="406" cy="242" r="7" fill={theme.accent} />
        </Svg>
    );
}

// Mark + "rabbit" wordmark, for headers.
export function Logo({ size = 34, color = theme.white }) {
    return (
        <View style={styles.row}>
            <LogoMark size={size} color={color} />
            <Text style={[styles.word, { color, fontSize: size * 0.62 }]}>rabbit</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    word: {
        fontFamily: theme.font.bold,
        letterSpacing: -0.5,
    },
});
