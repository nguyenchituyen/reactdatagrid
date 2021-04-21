module.exports = {
  comments: false,
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    '@babel/transform-runtime',
    '@babel/plugin-proposal-class-properties',
  ],
  ignore: ['node_modules', '.next', 'out'],
};
