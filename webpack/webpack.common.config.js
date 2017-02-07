'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');
const styleLintPlugin = require('stylelint-webpack-plugin');

exports.preLoaders = function () {
  return {
    module: {
      loaders :[
        {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss!sass?sourceMap&outputStyle=expanded")
      }
      ],
      preLoaders: [
            {test: /\.jsx?$/, loader: "eslint-loader", exclude: /node_modules/}
      ]
    },
    plugins:[
      new ExtractTextPlugin("styles.css")
    ],
    sassLoader: {
      includePaths: [path.resolve(__dirname,'..','node_modules')]
    }
  }
}

exports.styleLintPlugin = function(){
  return new styleLintPlugin({
    configFile: '.stylelintrc',
    context: 'app/',
    files: '**/*.scss',
    failOnError: true
  });
}

exports.vendorChunks = function() {
  return {
    entry: {
      vendor : ["babel-polyfill", "react", "redux", "react-redux", "react-dom", "react-router",
                  "react-router-redux", "redux-thunk", "redux-logger",
                  "react-addons-test-utils", "expect",
                  "react-stateless-wrapper", "axios", "es6-promise", "spark-md5"]
    }
  }
}

exports.shellPlugin = function() {
  return {
    plugins: [
      new WebpackShellPlugin({onBuildExit:['node bundle-size-checker.js']})
    ]
  }
}