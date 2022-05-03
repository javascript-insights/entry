const path = require('path');
const webpack = require('webpack');

const banner = `
/*************************
 * Application Insights! *
 *************************/
`;

module.exports = {
  entry: 'main.js',
  output: {
    path: path.resolve(__dirname, '..', 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner,
      entryOnly: true
    }),
    new webpack.EnvironmentPlugin({
      DEBUG: process.env.NODE_ENV === 'development',
      NODE_ENV: process.env.NODE_ENV
    })
  ],
  resolve: {
    modules: [
      'node_modules', // The default
      'src'
    ]
  }
};
