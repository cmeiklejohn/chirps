module.exports = function(grunt) {

  grunt.initConfig({
    traceur: {
      custom: {
        files:{
          'public/js/': ['app/**/*.js']
        }
      }
    },
    react: {
      app: {
        options: {
          extension: 'jsx'
        },
        files: {
          'public/js/app/components': 'app/components'
        }
      }
    }
  });

  grunt.registerTask('bootstrap', ['react', 'traceur']);

  grunt.loadNpmTasks('grunt-traceur');
  grunt.loadNpmTasks('grunt-react');
};
