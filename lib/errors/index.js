'use strict';

var _       = require('underscore');
var assert  = require('assert');
var cli     = require('cli');
var util    = require('util');
var errors  = require('./errors');

var map     = _.indexBy(errors, 'code');

function raiseError(code) {
    assert(code in map);

    var args,
        error,
        msg;

    error   = map[code];
    args    = _.toArray(arguments);
    args[0] = error.description;
    msg     = util.format.apply(util, args);

    cli[error.level](msg);
}

module.exports = {
    raiseError,
};
