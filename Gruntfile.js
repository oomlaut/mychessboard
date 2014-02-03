module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		files:{
			scss:{
				'web/styles/main.css': 'web/styles/source/main.scss'
			}
		},

		uglify: {
			options: {}
		},

		jshint: {
			options: {
				globals: {}
			}
		},

		sass:{
			options: {
				banner: "/* <%= pkg.name %> styles */"
			},
			dev:{
				options:{
					style:'expanded'
					// debugInfo: true,
					// lineNumber: true
				},
				files: '<%= files.scss %>'
			},
			dist:{
				options:{
					style:'compressed',
					noCache:true,
					quiet:true
				},
				files: '<%= files.scss %>'
			}
		},

		notify:{
			options:{
				title: 'Chessify Notification'
			},
			scss:{
				options:{
					message: 'scss files compiled'
				}
			}
		},

		watch: {
			options:{
				debounceDelay:1000,
				livereload:false
			},
			scripts:{
				files:['web/scripts/source/*.js'],
				tasks: ['uglify']
			},
			styles:{
				files:['web/styles/source/*'],
				tasks: ['sass:dev', 'notify:scss']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', ['sass:dev', 'watch']);
	grunt.registerTask('compile', ['sass:dev']);
	grunt.registerTask('dist', ['sass:dist']);

};
