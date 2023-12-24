module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            options: { // mapeia o main.css
                sourceMap: true,
                sourceMapFilename: 'dev/styles/main.css.map'
            },

            development: { // compila o 'main.less' de 'src' para a pasta de desenvolvimento como main.css 
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },

            production: { // minifica o 'main.less' de 'src' para a pasta de produção como main.min.css 
                options: {
                    compress: true,
                    sourceMapFilename: 'dist/styles/main.min.css.map'
                },

                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },

        watch: { // acompanha a mudança dos arquivos automaticamente 
            less: {
                files: ['src/styles/main.less'],
                tasks: ['less:development']
            },

            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },

        replace: {
            dev: { // transfere o 'index.html' de 'src'para a pasta de desenvolvimento
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },

            dist: { // transfere o 'index.html' de 'src'para a pasta de produção
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            },
        },

        htmlmin: { // minifica o html de 'src'
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },

                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },

        clean: ['prebuild'],

        uglify: { // minifica o arquivo main.js
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        },

        imagemin: { // mninifica as imagens do 'src'
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: '**/*.{png,jpg}',
                    dest: 'dev/images/'
                }]
            }
        },

        copy: {
            imagesdev: {
                expand: true,
                cwd: 'src/images/',
                src: '**/*.{png,jpg}',
                dest: 'dev/images/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['replace:dev', 'copy', 'imagemin', 'less:production', 'htmlmin:dist', 'uglify', 'clean']);
}