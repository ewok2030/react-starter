const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = '/build/public';

module.exports = {
  entry: [
    path.join(__dirname, 'src/client/index.js'),
  ],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    port: 3001,
    hot: true,
    filename: '[name].js',
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './public',
    proxy: {
      '*': 'http://localhost:3000',
    },
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: 'src/client/public/index.html',
      favicon: 'src/client/public/favicon.ico'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
};
