'use strict';

const autodetect    = require('./autodetect');
const envs          = require('../environments');
const errors        = require('../errors');

const AUTODETECT    = 'autodetect';

function empty(files) {
    return !files || files.length === 0;
}

function log(results) {
    // log result of environment detection or selection
    if (results.environment) {
        if (results.autodetected) {
            errors.raiseError('chosen-environment', results.envName);
        }
    } else {
        if (results.autodetected) {
            errors.raiseError('autodetect-failed');
        } else {
            errors.raiseError('invalid-environment', results.envName);
        }
    }

    // log result of discovering entry points
    if (empty(results.entryPoints)) {
        if (results.autodetected) {
            // error, shouldn't have happened
        }

        errors.raiseError('no-files-discovered');
    }
}

function driver(envName, files) {
    // there are 4 cases
    // 1. envName = autodetect, no files specified
    //    we'll autodetect and then use the discovered list of files
    // 2. envName = autodetect, files specified
    //    we'll autodetect but use the passed in list of files
    // 3. envName specified, no files specified
    //    we'll use the specified env, and use it to discover the files
    // 4. envName specified, files specified
    //    we'll use the specified env, and the passed in list of files

    let   driver;
    let   environment;
    let   entryPoints;
    const autodetected = envName === AUTODETECT;

    if (autodetected) {
        driver      = autodetect();
        envName     = driver.envName;
        environment = envName && envs.getByName(envName);
        entryPoints = !empty(files) || driver.files;
    } else {
        environment = envName && envs.getByName(envName);
        entryPoints = !empty(files) || (env && environment.discover());
    }

    log({
        envName,
        autodetected,
        environment,
        entryPoints,
    });

    return {
        environment,
        entryPoints,
    };
}

module.exports = driver;
