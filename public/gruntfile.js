module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      task1: {
        options:{
          sourceMap: false,
        },
        files: [{
          cwd: 'Js/',
          src:'**/*.js',
          dest: 'finalCode',
          expand: true,
          flatten: false
        }]
      }
    },
    clean: {
      //js: ['path/to/dir/*.js', '!path/to/dir/*.min.js']
      folder_v2: ['finalCode/*'],
    },
    processhtml: {
      options: {
        data: {
          message: 'Hello world!'
        }
      },
      dist: {
        files: {
          'index.html': ['index.html']
        }
      }
    }
      
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-processhtml');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};