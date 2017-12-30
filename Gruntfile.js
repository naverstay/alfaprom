module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      templates: {
        files: ['jade/*.jade', 'jade/*.pug'],
        tasks: ['pug'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['sass/*.scss'],
        tasks: ['wellington'],
        options: {
          spawn: false
        }
      }
    },
    wellington: {
      your_target: {
        src: [
          'sass/main_global.scss'
          //'sass/**/*.scss'
        ],
        options: {
          //debug: true,
          p: 'sass',
          b: 'styles',
          s: 'compressed',
          d: 'i/src',
          gen: 'i/dist',
          font: 'fonts'
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          compress: false,
          yuicompress: false,
          sourcemap: false
        },
        files: {
          'styles/main_global.css': 'sass/main_global.scss'
        }
      }
    },
    uglify: {
      all: {
        options: {
          compress: {
            drop_console: true
          },
          sourceMap: false,
          mangle: false
        },
        files: {
          'js/main.min.js': [
            'js/jquery1.10.js',
            'js/jquery.easytabs.min.js',
            'js/jquery.backstretch.min.js',
            'js/select2.js',
            'js/slick.js',
            'js/script.js'
          ]
        }
      }
    },
    pug: {
      compile: {
        options: {
          basedir: 'jade',
          pretty: true,
          data: {
            client: false,
            debug: true,
            pretty: true
          }
        },
        files: [{
          cwd: "jade/",
          src: "*.jade",
          dest: "",
          expand: true,
          ext: ".html"
        }]
      }
    }
  });

  var JadeInheritance = require('pug-inheritance');
  var changedFiles = [];

  var onChange = grunt.util._.debounce(function () {
    var options = grunt.config('pug.compile.options');
    var dependantFiles = [];

    options.skip = ['node_modules'];

    changedFiles.forEach(function (filename) {
      var directory = options.basedir;
      var inheritance = new JadeInheritance(filename, directory, options);

      if (/mixins.pug/ig.test(filename)) {
        console.log('\n*** mixins changed, compiling all templates in path "' + directory + '" ***\n');
        dependantFiles.push('*.jade');
      } else {
        dependantFiles = dependantFiles.concat(inheritance.files);
      }
    });

    var config = grunt.config('pug.compile.files')[0];
    config.src = dependantFiles;
    grunt.config('pug.compile.files', [config]);

    changedFiles = [];
  }, 100);

  grunt.event.on('watch', function (action, filepath, type) {
    if (type === 'templates') {
      changedFiles.push(filepath);
      onChange();
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-wellington');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['watch']);
};
