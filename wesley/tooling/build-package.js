const fs = require('fs')
const { exec } = require('child_process');

const package = process.argv[2]
exec(`yarn babel ${package}/src -d ${package}/dist`, (e,so,se) => {
    exec(`cp ${package}/package.json ${package}/dist/package.json`, (e, so, se) => {

    });
});
