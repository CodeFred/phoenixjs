'use strict';

const _     = require('underscore');
const list  = require('./list');

const byEnv = _.indexBy(list, 'name');
const names = _.pluck(list, 'name');

function getByName(env) {
    env = env.toLowerCase();
    return byEnv[env].module;
}

function getList() {
    return names;
}

module.exports = {
    getByName,
    getList,
};
