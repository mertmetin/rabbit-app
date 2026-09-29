const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Map and payment libraries are native-only; the web build gets placeholders instead.
const webStubs = {
  'react-native-maps': path.resolve(__dirname, 'src/web-stubs/react-native-maps.js'),
  'react-native-maps-directions': path.resolve(__dirname, 'src/web-stubs/react-native-maps-directions.js'),
  '@stripe/stripe-react-native': path.resolve(__dirname, 'src/web-stubs/stripe-react-native.js'),
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && webStubs[moduleName]) {
    return { type: 'sourceFile', filePath: webStubs[moduleName] };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
