const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: {
		main: __dirname + '/JS/main.js',
    login: __dirname + '/JS/login.js'
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/dist/js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.js$/,
				use: 'babel-loader'
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
		]
	},
	plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production'
    })
  ]
};

module.exports = config;
