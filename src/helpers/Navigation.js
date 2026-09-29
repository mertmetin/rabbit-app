// Jump to the Home tab's first screen from anywhere in the app.
export function goHome(navigation) {
    navigation.navigate('Root', { screen: 'Home', params: { screen: 'Home' } });
}
