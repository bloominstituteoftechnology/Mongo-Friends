const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
var path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
] : [];

module.exports = [
  {
    entry: './src/server/app.js',
    output: {
      path: path.resolve(__dirname,'.'),
      filename: 'server.js',
      publicPath: path.resolve(__dirname,'.')
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
      fs: 'empty'
    },
    externals: nodeExternals(),
    plugins: productionPluginDefine,
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  },
];
