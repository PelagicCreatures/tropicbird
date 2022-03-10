module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.initConfig({
		sass: {
			dist: {
				options: {
					loadPath: ['./node_modules','./node_modules/material-components-web/node_modules']
				},
				files: [{
					expand: true,
					cwd: 'components',
					src: ['*.scss'],
					dest: './dist',
					ext: '.css'
				}]
			}
		}
	});
}
