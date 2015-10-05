'use strict';

var envs    = require('../environments');
var errors  = require('../errors');

function getDriver(env) {
    return envs.byName(env) ||
           errors.raiseError('invalid-environment', env);
}

module.exports = {
    getDriver,
};
