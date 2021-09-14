const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();
// import path from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import webpack from 'webpack';
// import dotenv from 'dotenv';
// dotenv.config()
// const __dirname = path.resolve();

module.exports = {
  mode: 'development',
  entry: {
    index: ["regenerator-runtime/runtime.js",'./build/client/index.js']
  },
  devServer: {
    static: './build/client',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'public/index.html'
    }),
    new webpack.DefinePlugin({
      env: {
        SLACK_INTEGRATION: JSON.stringify(process.env.SLACK_INTEGRATION),
        HUBSPOT_INTEGRATION: JSON.stringify(process.env.HUBSPOT_INTEGRATION),
        FUSEBIT_URL: JSON.stringify(process.env.FUSEBIT_URL)
      },
      LAST_BUILD_TIME: JSON.stringify((new Date()).toISOString())
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
    clean: true,
    publicPath: '/client'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};