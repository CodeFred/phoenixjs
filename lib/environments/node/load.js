'use strict';

const _         = require('underscore');
const esprima   = require('esprima');
const fs        = require('fs');

const finder    = require('./finder');
const fsutils   = require('./fsutils');
const internal  = require('./internal');

function removeShebang(content) {
    if (content.startsWith('#!')) {
        content = content.replace(/^\#\!.*/, '');
    }
    return content;
}

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
        contents    = String(fs.readFileSync(file));
        contents    = removeShebang(contents);
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

function readPackage(file) {
    const directory = fsutils.dirname(file);
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

const LOADERS = [
    {
        predicate:  internal.isInternal,
        dispatch:   readInternal,
    },
    {
        predicate:  path => fsutils.basename(path) === 'package.json',
        dispatch:   readPackage,
    },
    {
        predicate:  path => fsutils.extname(path) === '.json',
        dispatch:   readJson,
    },
    {
        predicate:  path => fsutils.extname(path) === '.node',
        dispatch:   readBinary,
    },
    {
        predicate:  () => true,
        dispatch:   readJavascript,
    },
];

function load(path) {
    return _.find(LOADERS, l => l.predicate(path)).dispatch(path);
}

module.exports = load;
