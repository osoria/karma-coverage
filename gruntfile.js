module.exports = function (grunt) {
  grunt.initConfig({
    pkgFile: 'package.json',
    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'dot'
      },
      unit: {
        src: [
          'test/mocha-globals.coffee',
          'test/*.spec.coffee'
        ]
      }
    },
    'npm-contributors': {
      options: {
        commitMessage: 'chore: update contributors'
      }
    },
    bump: {
      options: {
        commitMessage: 'chore: release v%VERSION%',
        pushTo: 'upstream'
      }
    },
    eslint: {
      target: [
        'lib/*.js',
        'gruntfile.js',
        'karma.conf.js'
      ]
    }
  })

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('test', ['simplemocha'])
  grunt.registerTask('default', ['eslint', 'test'])

  grunt.registerTask('release', 'Bump the version and publish to NPM.', function (type) {
    grunt.task.run([
      'npm-contributors',
      'bump-only:' + (type || 'patch'),
      'changelog',
      'bump-commit',
      'npm-publish'
    ])
  })
}
