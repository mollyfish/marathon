var dest = './public';
var src = './src';

module.exports = {
  javascript: {
    src: src + '/**/*.js',
    dest: dest + '/js/',
    entryPoint: 'index.js',
    packedFile: 'packed.js'
  },
  sass: {
    src: src + '/styles/**/*.{sass,scss}',
    dest: dest + '/styles/',
    settings: {
      indentedSyntax: true,
    }
  },
  html: {
    src: src + "/*.html",
    dest: dest,
  },
  views: {
    src: src + "/views/**/*.html",
    dest: dest + "/views/",
  },
  server: {
    serverFile: src + '/server.js'
  },
  production: {
    cssSrc: dest + '/styles/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  }
};
