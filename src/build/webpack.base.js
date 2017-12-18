'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelLoader = {
	loader: 'babel-loader',
	options: {
		presets: [['env', {
			targets: {
				browsers: 'ie 8'
			}
		}]],
		plugins: ['transform-runtime']
	}
};

module.exports = {
	entry: {
		app: path.resolve(__dirname, '../../app/index.js')
	},
	output: {
		path: path.resolve(__dirname, '../../dist'),
		publicPath: './',
		filename: '[name].js'
	},
	devServer: {
		contentBase: path.resolve(__dirname, '../../dist'),
		port: 2000,
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						js: babelLoader
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.js$/,
				use: babelLoader,
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpe?g|gif|eot|woff|woff2|ttf|svg)([\?]?.*)$/,
				use: {
					loader: 'file-loader'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Pagination',
			filename: 'index.html',
			template: path.resolve(__dirname, './template.html')
		})
	]
};