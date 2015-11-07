'use strict';

const _             = require('underscore');
const fs            = require('fs');
const Module        = require('module');
const path          = require('path');
const fsutils       = require('./fsutils');

const FILE_SUFFIXES = [
    '',
    '.js',
    '.json',
    '.node',
];
const DIR_SUFFIXES  = [
    '/package.json',
    '/index.js',
    '/index.json',
    '/index.node',
];

function findOne(suffixes, file) {
    let paths = _.map(suffixes, s => fsutils.join(file, s));
    return _.find(paths, f => fsutils.exists(f));
}

function findModule(file, start) {
    let dirs = getModulePaths(start);
    return file && _.find(dirs, tryInDir);

    function tryInDir(dir) {
        const full = fsutil.join(dir, file);
        return findFile(full) ||
               findDirectory(full);
    }
}

function getModulePaths(start) {
    // As described in
    // https://nodejs.org/api/modules.html#modules_all_together

    let parts   = path.normalize(start).split(path.sep);
    let result  = [].concat(Module.globalPaths);
    let dirs    = _.reduceRight(parts, constructPath, result);

    return dirs;

    function constructPath(memo, value, index) {
        if (value === fsutils.MODULES_DIR) {
            return memo;
        }

        // start: 0-based, inclusive
        // end:   0-based, non-inclusive
        let sliced  = parts.slice(0, index + 1);
        sliced.push(fsutils.MODULES_DIR);

        let dir     = fsutils.join.apply(fsutils, sliced);
        memo.push(dir);

        return memo;
    }
}

module.exports = {
    findFile:       _.partial(findOne, FILE_SUFFIXES),
    findDirectory:  _.partial(findOne, DIR_SUFFIXES),
    findModule:     findModule,
};
