import autoprefixer from 'autoprefixer'
import path from 'path'
import sass from 'sass'
import {
	dirname
}
from 'path';
import {
	fileURLToPath
}
from 'url';

const __dirname = dirname(fileURLToPath(
	import.meta.url));

const config = {
	mode: 'development',
	entry: ['./mdc-bundle.scss'],
	output: {
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'bundle.css'
				}
			}, {
				loader: 'extract-loader'
			}, {
				loader: 'css-loader'
			}, {
				loader: 'sass-loader',
				options: {
					implementation: sass,
					webpackImporter: false,
					sassOptions: {
						includePaths: ['./node_modules']
					}
				}
			}, {
				loader: 'postcss-loader',
				options: {
					postcssOptions: {
						plugins: () => [autoprefixer()]
					}
				}
			}]
		}]
	}
}

export {
	config
}
