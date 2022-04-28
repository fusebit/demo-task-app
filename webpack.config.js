const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  mode: 'development',
  entry: {
    index: ['regenerator-runtime/runtime.js', './libc/client/index.js'],
  },
  devServer: {
    static: './libc/client',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'public/index.html',
      inject: false,
    }),
    new webpack.DefinePlugin({
      env: {
        SLACK_BOT_INTEGRATION_ID: JSON.stringify(process.env.SLACK_BOT_INTEGRATION_ID),
        HUBSPOT_INTEGRATION_ID: JSON.stringify(process.env.HUBSPOT_INTEGRATION_ID),
        E2E_HUBSPOT_SLACK_BOT_INTEGRATION_ID: JSON.stringify(process.env.E2E_HUBSPOT_SLACK_BOT_INTEGRATION_ID),
      },

      LAST_BUILD_TIME: JSON.stringify(new Date().toISOString()),
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '{{APP_URL}}/client',
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
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader","css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
    },
  },
};
