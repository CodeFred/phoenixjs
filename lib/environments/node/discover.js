'use strict';

const resolve   = require('./resolve');

function discover() {
    return [ resolve('./') ];
}

module.exports = discover;
