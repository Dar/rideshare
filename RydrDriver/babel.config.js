module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        allowlist: ['GOOGLE_API_KEY']
      }]
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};