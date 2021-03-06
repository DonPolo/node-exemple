const nodeExternals = require('webpack-node-externals');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
console.log(__dirname);
module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, '.'),
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    index: './server.ts',
  },
  devtool: isDev ? 'inline-source-map' : undefined,
  output: {
    path: path.join(__dirname, isDev ? '../../dev' : '../../dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(html)$/,
        use: 'html-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  node: {
    fs: 'empty',
  },
};
