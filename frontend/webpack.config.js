import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[contenthash].js',
		clean: true,
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				// include: [path.resolve(__dirname, 'src')],
				resolve: {
					fullySpecified: false,
				},
				use: {
					loader: 'babel-loader',
				},
			},
			// {
			// 	test: /\.css$/,
			// 	use: [MiniCssExtractPlugin.loader, 'css-loader'],
			// },
			{
				test: /\.module\.s(a|c)ss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]__[local]___[hash:base64:5],',
								namedExport: false,
							},
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.(css|s(a|c)ss)$/,
				exclude: /\.module\.s(a|c)ss$/, // Ignora os módulos
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
		}),
	],

	devServer: {
		static: './dist',
		port: 3000,
		open: true,
		host: 'localhost',
		historyApiFallback: true,
	},

	devtool: 'source-map',

	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components/'),
			'@styles': path.resolve(__dirname, 'src/styles/'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@assets': path.resolve(__dirname, 'src/assets/'),
		},
		extensions: ['.js', '.json', '.jsx'],
	},
};
