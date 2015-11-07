'use strict';

const _         = require('underscore');
const esprima   = require('esprima');
const fs        = require('fs');

const finder    = require('./finder');
const internal  = require('./internal');
const fsutils   = require('./fsutils');

function readJavascript(file) {
    let contents;
    let result;

    const options = {
        loc:        true,
        raw:        true,
        tokens:     true,
        tolerant:   true,
    };

    try {
        contents    = fs.readFileSync(file);
        result      = esprima.parse(contents, options);
    } catch (e) {
        // error
    }

    return result;
}

function readJson(file) {
    let contents;
    let result;

    try {
        contents    = fs.readFileSync(file);
        result      = JSON.parse(contents);
    } catch (e) {
        // error
    }

    return result;
}

function readBinary(file) {
    let result;

    try {
        result      = require(file);
    } catch (e) {
        // error
    }

    return result;
}

function readPackage(directory, file) {
    let packageJson = readJson(file);
    if (!packageJson.main) {
        // error
    }

    let main    = fsutils.join(directory, packageJson.main);
    if (!main) {
        // error
    }

    return load(main);
}

function readInternal(file) {
    // todo
    return file;
}

function load(path) {
    if (internal.isInternal(path)) {
        return readInternal(path);
    }

    const OPS   = {
        '/package.json':    _.partial(readPackage, path),
        '.json':            readJson,
        '.node':            readBinary,
        '':                 readJavascript,
    };
    return OPS[_.find(_.keys(OPS), op => path.endsWith(op))](path);
}

module.exports = load;
