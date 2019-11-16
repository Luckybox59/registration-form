const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['@babel/polyfill','./src/index.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  plugins: [
    new HtmlPlugin({
      filename: 'index.html',
      template: './src/index.html',
    })
  ],
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  }
}