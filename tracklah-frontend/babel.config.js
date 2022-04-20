module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
<<<<<<< HEAD
    plugins: ['react-native-reanimated/plugin', ["module:react-native-dotenv"]],
=======
    plugins: [['react-native-reanimated/plugin'], ["module:react-native-dotenv"]]
>>>>>>> main
  };
};
