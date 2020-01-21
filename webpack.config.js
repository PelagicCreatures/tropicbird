const autoprefixer = require('autoprefixer')
const path = require('path')

module.exports = {
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
				loader: 'postcss-loader',
				options: {
					plugins: () => [autoprefixer()]
				}
			}, {
				loader: 'sass-loader',
				options: {
					sassOptions: {
						includePaths: ['./node_modules']
					}
				}
			}]
		}]
	}
}