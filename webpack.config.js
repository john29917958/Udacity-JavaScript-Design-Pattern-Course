module.exports = {
	entry: __dirname + '/javascripts/app/main.js',
	output: {
		path: __dirname + '/javascripts',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style!css' }
		]
	}
}