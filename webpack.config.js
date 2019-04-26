const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

  module.exports = {
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      path: resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: [/node_modules/, resolve(__dirname, 'notes')]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hi TypeScript',
        // template: '../index.html',
        template: resolve(__dirname, 'src/index.html'),
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    }
  };