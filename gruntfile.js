module.exports = function(grunt){
	grunt.initConfig({

		concat : { //name of task
			options :{
				separator: '\n\n//---------------------------\n\n'
			},
			dist : { //name of job for that task
				src: ['components/scripts/*.js'],
				dest: 'builds/development/js/script.js'
			}
		},//concat

		bower_concat:{
			all: {
				dest: 'builds/development/js/_bower.js',
				cssDest: 'builds/development/css/_bower.css'
			}
		},

		sass: {
			dist: {
				options: { //look at plugin website for various options
					style: 'expanded'
				},
				files: [{
					src: 'components/sass/style.scss',
					dest: 'builds/development/css/style.css'
				}]
			}
		}, //sass

		wiredep: {
			task: {
				src: 'builds/development/**/*.html'
			}
		},

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 3000,
					base: 'builds/development/',
					livereload: true
				}
			}
		},

		watch: {
			options: {
				spawn: false,
				livereload: true
			},
			scripts: {
				files: ['builds/development/**/*.html', 
				'components/scripts/**/*.js',
				'components/sass/**/*.scss'],
				tasks: ['concat','sass']
			}
		}

	}); //init config section

	grunt.loadNpmTasks('grunt-contrib-concat'); //concatenates files
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.registerTask('default', ['wiredep', 'bower_concat', 'concat', 'sass', 'connect', 'watch']);

}; //wrapper function