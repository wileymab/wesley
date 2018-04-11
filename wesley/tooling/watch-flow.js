const { exec } = require('child_process')
const filewatcher = require('filewatcher')
const glob = require('glob')

const watcher = filewatcher();
const files = glob.sync(`${__dirname}/../wesley-*/src/**/*.js`);

// console.log(JSON.stringify(files));

files.forEach(file => watcher.add(file))

watcher.on('change', function(file, stat) {
    // console.log("File modified: "+file);
    // console.log(""+process.cwd())
    exec("clear && yarn flow", (e, so, se) => {
        // console.log(e);
        console.log(so);
        // console.log(se);
    });
});

console.log("Watching all source files for changes...");
