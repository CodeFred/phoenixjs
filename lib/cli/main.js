'use strict';

const cli       = require('cli');
const glob      = require('glob');
const options   = require('./options');
const whattodo  = require('./whattodo');

function parseCommandLine() {
    cli.enable('version', 'status');
    cli.parse(options);

    return {
        args:       cli.args,
        options:    cli.options,
    };
}

function getInputFiles(files) {
    const options = { nonull: true };
    const expand  = (results, file) => results.concat(glob.sync(file, options));

    return files.reduce(expand, []);
}

function getEnvironment(options) {
    return options.environment;
}

function go(args) {
    console.log(args.entryPoints);
    const result = args.entryPoints.map(args.environment.load);
    console.log(result);
}

function main() {
    const cl        = parseCommandLine();
    const files     = getInputFiles(cl.args);
    const env       = getEnvironment(cl.options);
    const args      = whattodo(env, files);

    go(args);
}

module.exports = main;
