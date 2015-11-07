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
    let package = readJson(file);
    if (!package.main) {
        // error
    }

    let main    = fsutils.join(directory, package.main);
    if (!main) {
        // error
    }

    return loadAsFile(main);
}

function readInternal(file) {
    // todo
    return file;
}

function loadMapped(ops, find, entity) {
    const path = find(entity);
    return ops[_.find(_.keys(ops), op => path.endsWith(op))](path);
}

function loadAsFile(file) {
    const OPS   = {
        '.json':    readJson,
        '.node':    readBinary,
        '':         readJavascript,
    };
    return loadMapped(OPS, finder.findFile, file);
}

function loadAsDirectory(dir) {
    const OPS   = {
        '/package.json':    _.partial(readPackage, dir),
        '':                 loadAsFile,
    };
    return loadMapped(OPS, finder.findDirectory, dir);
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

module.exports = {
    load:               load,
    loadAsFile:         loadAsFile,
    loadAsDirectory:    loadAsDirectory,
};
