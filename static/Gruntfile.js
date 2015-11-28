module.exports = function(grunt){
    
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-wiredep");
    
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
                src: "pages/index.html"
            }
        }
    });
    
    grunt.registerTask("default", ["sass", "postcss:dist"])
}