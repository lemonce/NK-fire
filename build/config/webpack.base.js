'use strict';

const path = require('path');
const cwd = process.cwd();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
		app: path.resolve(cwd, 'app/viewer/index.js')
	},
	output: {
		path: path.resolve(cwd, 'dist'),
		publicPath: '/config/',
		filename: '[name].js'
	},
	devServer: {
		contentBase: path.resolve(cwd, 'dist'),
		port: 2000,
		hot: true,
		proxy: {
			'/api': `http://localhost:${httpPort}`,
		}
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
				loader: ExtractTextPlugin.extract(['css-loader'])
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
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
			template: path.resolve(__dirname, './template/template.html')
		}),
		new ExtractTextPlugin('styles.[hash:5].css')
	]
};