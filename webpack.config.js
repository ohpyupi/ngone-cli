const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './app/app.module.js',
	output: {
		filename: 'webpack.bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
	plugins: [
	],
	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: "babel-loader",
			query: {
				presets: ['es2015']
			}
		},
		{
			test: /\.html$/,
			loader: "html-loader"
		},
		{
			test: /\.css$/, 
			loader: "style-loader!css-loader" 
		},
		{
			test: /\.(eot|svg|png|jpg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
			loader: 'url-loader'
		}
	]
	},
};
