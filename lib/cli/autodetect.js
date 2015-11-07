'use strict';

const _     = require('underscore');
const envs  = require('../environments');

function first(array, pred) {
    let result;

    _.find(array, value => result = pred(value));
    return result;
}

function getFiles(envName) {
    const env   = envs.getByName(envName);
    const files = env.discover();

    if (files && files.length > 0) {
        return {
            envName,
            files,
        };
    }
}

function autodetect() {
    return first(envs.getList(), getFiles);
}

module.exports = autodetect;
