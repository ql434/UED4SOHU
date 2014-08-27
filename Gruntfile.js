'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('Fex-sohu.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['public/out/','public/docs/']
    },
	copy:{
	  main:{
		expand:true,
		cwd:'src/',
		src:'**',
		dest:['public/out/debug','public/out/release']
	  }
	},
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['public/src/js/**/*.js'],
        dest: 'public/out/concat/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'public/out/release/<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['public/src/js/site.js']
      }
/*      test: {
        src: ['test*//*.js']
      }*/
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    },
	jsdoc:{
		base:{
			src:['public/src/js/*.js'],
			options:{
				destination:'docs/'
			}
		}
	},
  	htmlhint:{
  		build:{
  			options:{
  				'tag-pair':true,
  				'tagname-lowercase':true,
  				'attr-value-double-quotes':true,
  				'attr-lowercase':true,
  				'spec-char-escape':true,
  				'id-unique':true,
  				'head-script-disabled':true
  			},
  			src:['public/src/*.html']
  		}
  	}
  }
  
  );

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-htmlhint');

  // Default task.
  grunt.registerTask('default', ['jshint', 'htmlhint','qunit', 'clean','copy', 'concat', 'uglify']);

};
