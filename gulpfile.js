// gulp 插件;

const gulp = require("gulp");
const connect = require("gulp-connect");
// connect 的自动刷新;
// 合并插件;
const concat = require("gulp-concat");
// 压缩插件;
const uglify = require("gulp-uglify");
// es6的编译;
// const babel = require("gulp-babel");
// sass 编译插件;
const sass = require("gulp-sass-china");

gulp.task("connect",()=>{
    connect.server({
        root:"dist/",
        livereload:true,
        middleware: function (connect, opt) {
            var Proxy = require('gulp-connect-proxy');
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
    });
})

gulp.task( "html" , ()=>{
    return gulp.src("*.html")
           .pipe(gulp.dest("dist"))
           // 数据更新之后,进行页面刷新;
           .pipe(connect.reload());
})

// 监听;

gulp.task("watch" , ()=>{
    gulp.watch("*.html" , ["html","sass"]);
    gulp.watch("sass/*.scss" , ["html","sass"]);
    gulp.watch(["libs/*.js","moudle/*.js"] , ["html","script"]);
})

gulp.task("sass" , () => {  
    return gulp.src(["sass/*.scss"])
           .pipe(sass().on("error",sass.logError))
           .pipe(gulp.dest("dist/css"));
})

// 压缩插件;
gulp.task("script" , ()=>{
    return gulp.src(["moudle/*.js","libs/*.js"])
    // .pipe(uglify())

    .pipe(gulp.dest("dist/script"))
})

gulp.task("default",["watch","connect"]);