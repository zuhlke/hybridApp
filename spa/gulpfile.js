var gulp = require('gulp');
var htmlBuild = require('gulp-htmlbuild');
var eventStream = require('event-stream');
var replace = require('gulp-replace');
var concat = require('gulp-concat');

var paths = {
    dist: './dist',
    distApp: './dist/app',
    distJs: './dist/js',
    distCss: './dist/css',

    src: './app'
};

var files = {
    concatBowerFileName: 'bower.concat.js',
    concatHybridAppFileName: 'hybridApp.concat.js'
};

var globbing = {
    templates: [paths.src + '/**/*.template.html']
};

gulp.task('build-dist', ['buildMobileIos', 'copyTemplates']);
gulp.task('buildMobileIos', buildMobileIos);
gulp.task('copyTemplates', copyTemplates);

function copyTemplates() {
    return gulp
        .src(globbing.templates)
        .pipe(gulp.dest(paths.distApp));
}

function buildMobileIos(done) {
    gulp.src(['./index.html'])
        .pipe(replace(/\.mock\.js/g, '\.js'))
        .pipe(htmlBuild({
            angularStartUp: function (block) {
                eventStream.readArray([
                        '<body>'
                    ]
                    .map(function (line) {
                        return block.indent + line;
                    }))
                    .pipe(block);
            },
            
            cordova: function (block) {
                eventStream.readArray([
                    '<script src="cordova.js"></script>'
                ].map(function (line) {
                    return block.indent + line;
                })).pipe(block);
            },

            bower: htmlBuild.preprocess.js(function (block) {
                block
                    .pipe(createVinylGulpFilesOutOfPaths())
                    .pipe(concatFiles(files.concatBowerFileName, paths.distJs));

                block.end('./js/' + files.concatBowerFileName);
            }),

            hybridApp: htmlBuild.preprocess.js(function (block) {
                block
                    .pipe(createVinylGulpFilesOutOfPaths())
                    .pipe(concatFiles(files.concatHybridAppFileName, paths.distJs));

                block.end('./js/' + files.concatHybridAppFileName);
            }),

            angularCordovaStartUp: function (block) {
                eventStream.readArray([
                        '<script>',
                        'document.addEventListener("deviceready", onDeviceReady, false);',
                        '',
                        'function onDeviceReady() {',
                        'angular',
                        '.module(\'hybridApp\')',
                        '.constant(\'SecretGeneratorPlugin\', SecretGeneratorPlugin);',
                        '',
                        'angular.bootstrap(document, [\'hybridApp\']);',
                        '}',
                        '</script>'
                    ]
                    .map(function (line) {
                        return block.indent + line;
                    }))
                    .pipe(block);
            }
        }))
        .pipe(gulp.dest(paths.dist));

    done();
}

function createVinylGulpFilesOutOfPaths(opts) {
    var paths = eventStream.through();
    var files = eventStream.through();

    paths.pipe(eventStream.writeArray(function (err, srcs) {
        gulp.src(srcs, opts).pipe(files);
    }));

    return eventStream.duplex(paths, files);
}

function concatFiles(fileName, destinationPath) {
    return eventStream.pipeline(
        concat(fileName),
        gulp.dest(destinationPath)
    );
}