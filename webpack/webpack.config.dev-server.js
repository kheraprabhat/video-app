'use strict';

var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, '..', 'public', 'assets');
var commonWebpackConfig = require('./webpack.common.config');
var webpackConfigMerger = require('webpack-merge');
var webpackConfigValidator = require('webpack-validator');

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      "presets": ["es2015", "react", "stage-0"],
      "plugins": ["transform-decorators-legacy", "transform-object-assign"]
    },
    include: path.join(__dirname, '..', 'app'),
    exclude: path.join(__dirname, '..', 'node_modules')
  },
  { test: /\.json$/, loader: "json-loader" },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|otf|cur)$/,
    loader: 'url',
    query: {
        name: '[hash].[ext]',
        limit: 10000,
    }
  },
  { test: /\.html$/, loader: 'html-loader' }
];

var config = {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname, "..", "app"),
    devtool: 'source-map',
    entry: {
      server: "./server"
    },
    target: "node",
    eslint: {
      failOnError: true
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].js",
      // The output path from the view of the Javascript
      publicPath: "/assets/",
      libraryTarget: "commonjs2"
    },
    module: {
      loaders: commonLoaders.concat([
           {
              test: /\.css$/,
              loader: 'css/locals?module&localIdentName=[name]__[local]___[hash:base64:5]'
           }
      ])
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css'],
    },
    plugins: [
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: true
        })    ]
};

module.exports = webpackConfigMerger(config, commonWebpackConfig.preLoaders(),  commonWebpackConfig.vendorChunks());