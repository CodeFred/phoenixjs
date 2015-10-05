'use strict';

const _         = require('underscore');
const fs        = require('fs');
const Module    = require('module');

function maybe(fn) {
    let context,
        args,
        res;

    context = arguments[1];
    args    = _.toArray(arguments).slice(2);
    try {
        res = fn.apply(context, args);
    } catch (e) {
        res = e;
    }

    return res;
}

function findFiles() {
    let entry;

    entry = maybe(Module._resolveFilename, Module, '.', null);
    if (!(entry instanceof Error)) {
        return entry && [ entry ];
    }
}

module.exports = {
    findFiles,
};
