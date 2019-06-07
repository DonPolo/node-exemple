const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    main: __dirname + '/main.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../../assets/js'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  plugins: [new CleanWebpackPlugin()],
};

module.exports = config;
