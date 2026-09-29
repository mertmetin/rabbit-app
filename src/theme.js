// Rabbit's look in one place. Change brand colours here.
export const theme = {
    primary: '#00754a',
    primaryDark: '#005c3a',
    primarySoft: '#e6f2ec',
    accent: '#ffc845',
    text: '#1d1d1b',
    muted: '#6b6f76',
    border: '#e7e7ec',
    background: '#f6f6f8',
    white: '#ffffff',
    danger: '#d64545',
    radius: 14,
    font: {
        regular: 'sodo-sans-regular',
        semibold: 'sodo-sans-semibold',
        bold: 'sodo-sans-bold',
    },
};

export const formatPrice = (dollars) => `$${Number(dollars || 0).toFixed(2)}`;

// "Gala apples, 3 lb bag" -> { name: "Gala apples", size: "3 lb bag" }
export function splitTitle(title) {
    const at = title.lastIndexOf(', ');
    return at === -1 ? { name: title, size: '' } : { name: title.slice(0, at), size: title.slice(at + 2) };
}
