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

		imagemin: {
		   dist: {
		      options: {
		        optimizationLevel: 5
		      },
		      files: [{
		         expand: true,
		         cwd: 'builds/development/images',
		         src: ['**/*.{png,jpg,gif}'],
		         dest: 'builds/dist/images'
		      }]
		   }
		},
		uglify: {
			options: {
		      compress: {
		        drop_console: true
		      }
		    },
		    js: {
		      files: {
		        'builds/dist/js/script.min.js': ['builds/development/js/script.js'],
		        'builds/dist/js/_bower.min.js': ['builds/development/js/_bower.js']
		      }
		    }
		},

		cssmin: {
		   dist: {
		      options: {
		         banner: '/*! Sarah Lamont (@seriflafont) | MIT Licensed */'
		      },
		      files: {
		         'builds/dist/css/style.min.css': ['builds/development/css/**/*.css']
		      }
		  }
		},

		processhtml: {
		    options: {
		      strip: true
		    },
		    dist: {
		    	files: [{
			        expand: true,
			        cwd: 'builds/development',
			        src: '**/*.html',
			        dest: 'builds/dist'
			    }]
		    },
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
	
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-concat'); //concatenates files
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-bower-concat');

	grunt.registerTask('build',['imagemin', 'uglify', 'cssmin', 'processhtml']);
	grunt.registerTask('default', ['bower_concat', 'concat', 'sass', 'connect', 'watch']);

}; //wrapper function