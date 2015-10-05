'use strict';

var cli     = require('cli');
var glob    = require('glob');
var envs    = require('./environments');
var options = require('./options');

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

function getDriver(options) {
    const env    = options.environment;
    const driver = envs.getDriver(env);

    return driver;
}

function getEntryPoints(driver, files) {
    if (files.length > 0) {
        return files;
    } else {
        return driver.findFiles();
    }
}

function go(entryPoints) {
    console.log(entryPoints);
}

function main() {
    const cl        = parseCommandLine();
    const files     = getInputFiles(cl.args);
    const driver    = getDriver(cl.options);
    const entry     = getEntryPoints(driver, files);

    go(entry);
}

module.exports = main;
