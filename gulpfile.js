const gulp = require('gulp');
const smartgrid = require('smart-grid');
const gcmq = require('gulp-group-css-media-queries');
const del = require('del');

/* It's principal settings in smart grid project */
var settings = {
  outputStyle: 'scss',
  /* less || scss || sass || styl */
  columns: 12,
  /* number of grid columns */
  offset: '30px',
  /* gutter width px || % || rem */
  mobileFirst: false,
  /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: '1140px',
    /* max-width оn very large screen */
    fields: '30px' /* side fields */
  },
  breakPoints: {
    lg: {
      width: '1100px',
      /* -> @media (max-width: 1100px) */
    },
    md: {
      width: '960px'
    },
    sm: {
      width: '780px',
      fields: '15px' /* set fields only if you want to change container.fields */
    },
    xs: {
      width: '560px'
    }
    /* 
        We can create any quantity of break points.
 
        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
  }
};

gulp.task("smartgrid", function (done) {
  smartgrid('./src/scss', settings);
  done();
});

gulp.task("del", function () {
  return del("./dist")
});

gulp.task("gcmq", function () {
  return gulp.src('./src/assets/css/style.css')
    .pipe(gcmq())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task("assets", function () {
  return gulp.src([
      "./src/assets/*.html",
      "./src/assets/fonts/**/*",
      "./src/assets/img/**/*",
      "./src/assets/js/**/*"
    ], {
      base: 'src/assets'
    })
    .pipe(gulp.dest("./dist"))
    .pipe(gulp.src(".htaccess", { allowEmpty: true }))
    .pipe(gulp.dest("./dist"));
});

gulp.task("build", gulp.series("del", "assets", "gcmq"));