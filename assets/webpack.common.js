const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: {
		file: __dirname + '/JS/file.js',
		chat: __dirname + '/JS/chat.js',
		home: __dirname + '/JS/home.js',
    analytics: __dirname + '/JS/analytics.js',
    addresponse: __dirname + '/JS/addresponse.js',
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
