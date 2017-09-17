const path         = require("path")
const minimist     = require("minimist")
const browserSync  = require("browser-sync")
const gulp         = require("gulp")
const plumber      = require("gulp-plumber")
const sass         = require("gulp-sass")
const sassGlob     = require("gulp-sass-glob")
const autoprefixer = require("gulp-autoprefixer")
const cleanCSS     = require("gulp-clean-css")

const reload = browserSync.reload

const SRC_DIR  = "src"
const DEST_DIR = "."
const CSS_DIR  = SRC_DIR

const env = minimist(process.argv.slice(2))
const port = env.p || 3000

const BROWSER_SYNC_OPTIONS = {
    server: [SRC_DIR, DEST_DIR],
    port: port,
    open: false
}

const SASS_OPTIONS = {
    outputStyle: "compressed"
}

gulp.task("css", () => {
    return gulp.src([path.join(CSS_DIR, "**/*.{scss,css}"), "!" + path.join(CSS_DIR, "**/_*.{scss,css}")])
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.messageFormatted)
                this.emit('end')
            }
        }))
        .pipe(sassGlob())
        .pipe(sass(SASS_OPTIONS))
        .pipe(autoprefixer())
        .pipe(gulp.dest(DEST_DIR))
})

gulp.task("clean-css", () => {
    return gulp.src([path.join(CSS_DIR, "**/*.{scss,css}"), "!" + path.join(CSS_DIR, "**/_*.{scss,css}")])
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.messageFormatted)
                this.emit('end')
            }
        }))
        .pipe(sassGlob())
        .pipe(sass(SASS_OPTIONS))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest(DEST_DIR))
})

gulp.task("compile", ["css"])

gulp.task("watch", ["compile"], () => {
    browserSync(BROWSER_SYNC_OPTIONS)
    gulp.watch([path.join(CSS_DIR, "**/*.{scss,css}")], ["css", reload])
})

gulp.task("build", ["clean-css"])
