const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const dev = process.env.NODE_ENV === 'dev';

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
  ],
	watch: true,
	mode: 'development'
};

if (!dev) {
	config.plugins.push(new UglifyJsPlugin());
}

module.exports = config;
