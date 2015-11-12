var gulp     = require('gulp');
var config   = require('../config');

gulp.task('watch', function() {
  gulp.watch(config.html.src, ['html']);
  gulp.watch(config.sass.src,   ['sass']);
  gulp.watch(config.views.src,   ['views']);
});
