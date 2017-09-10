const path         = require("path")
const minimist     = require("minimist")
const browserSync  = require("browser-sync")
const gulp         = require("gulp")
const plumber      = require("gulp-plumber")
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

gulp.task("css", () => {
    return gulp.src(path.join(CSS_DIR, "**/style.css"))
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.messageFormatted)
                this.emit('end')
            }
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(DEST_DIR))
})

gulp.task("clean-css", () => {
    return gulp.src(path.join(CSS_DIR, "**/style.css"))
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.messageFormatted)
                this.emit('end')
            }
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest(DEST_DIR))
})

gulp.task("compile", ["css"])

gulp.task("watch", ["compile"], () => {
    browserSync(BROWSER_SYNC_OPTIONS)
    gulp.watch([path.join(CSS_DIR, "**/*.css")], ["css", reload])
})

gulp.task("build", ["clean-css"])
