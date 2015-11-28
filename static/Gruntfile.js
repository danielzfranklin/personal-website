module.exports = function(grunt){
    
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-wiredep");
    grunt.loadNpmTasks("grunt-contrib-watch");
    
    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "styles",
                    src: ["*.sass"],
                    dest: "styles/build/",
                    ext: ".css",
                }]
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require("autoprefixer")({
                        browsers: ["last 2 versions"]
                    })
                ]
            },
            dist: {
                src: "styles/build/*.css"
            }
        },
        wiredep: {
            target: {
                src: "pages/index.html",
                ignorePath: "../"
            }
        },
        watch: {
            sass: {
                files: ["**/*.sass"],
                tasks: ["sass", "postcss:dist"],
                options: {
                    spawn: false
                }
            }
        }
    });
    
    grunt.registerTask("default", ["sass", "postcss:dist"]);
};