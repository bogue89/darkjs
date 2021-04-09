const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const options = {
  publicPath: '',
};
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    darkjs: './src/index.dark.js',
  },
  devtool: 'inline-source-map',
  //watch: true,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Darktheme',
    }),
    new WebpackManifestPlugin(options),
    new MiniCssExtractPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
