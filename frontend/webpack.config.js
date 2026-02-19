import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default (env, argv) => {
	const isDev = argv.mode === 'development';
	const mode = argv.mode || 'development';

	console.log(`🛠️  Rodando Webpack em modo: ${mode.toUpperCase()}`);

	return {
		mode: mode,

		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: isDev ? 'js/[name].js' : 'js/[name].[contenthash].js',
			publicPath: '/',
			clean: true,
		},

		devtool: isDev ? 'source-map' : false,

		module: {
			rules: [
				//JAVASCRIPT
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					resolve: {
						fullySpecified: false,
					},
					use: {
						loader: 'babel-loader',
					},
				},

				//CSS MODULES ( Arquivos .module.scss)
				{
					test: /\.module\.s(a|c)ss$/,
					use: [
						isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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

				//CSS GLOBAL ( Arquivos .css ou .scss normais)
				{
					test: /\.(css|s(a|c)ss)$/,
					exclude: /\.module\.s(a|c)ss$/, // Ignora os módulos
					use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				},

				//IMAGENS
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
					generator: { filename: 'images/[hash][ext][query]' },
				},

				//MARKDOWN ( com Frontmatter)
				{
					test: /\.md$/,
					use: [{ loader: 'frontmatter-markdown-loader', options: { mode: ['html', 'body'] } }],
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
			hot: true,
			historyApiFallback: true,
			host: 'localhost',
		},

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
};
