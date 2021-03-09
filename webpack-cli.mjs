import webpack from 'webpack'
import {
	config
}
	from './webpack.config.js'

webpack(config, (err, stats) => { //
	if (err || stats.hasErrors()) {
		console.log(err, stats.toString())
	}
	console.log(stats.toString())
})
