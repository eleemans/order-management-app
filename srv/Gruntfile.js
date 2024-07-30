/* eslint-disable no-undef */
module.exports = function (grunt) {
  "use strict";
  grunt.initConfig({
    shell: {
      npm_build: {
        command: "npm run build",
      },
      npm_prune: {
        command: "npm prune --production",
      },
    },
  });

  grunt.loadNpmTasks("grunt-shell");
  grunt.registerTask("default", ["shell:npm_build", "shell:npm_prune"]);
};
