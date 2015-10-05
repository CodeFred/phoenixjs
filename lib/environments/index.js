'use strict';

const autodetect    = require('./autodetect');
const node          = require('./node');

let   ENVIRONMENTS  = {};

const envs          = [
    {
        name:   'node',
        module: node,
    },
    {
        name:   'autodetect',
        module: autodetect(ENVIRONMENTS),
        hidden: true,
    },
];

function addEnvironment(env) {
    Object.defineProperty(
        this,
        env.name,
        {
            value:      env.module,
            enumerable: !env.hidden,
        });
}

envs.forEach(addEnvironment.bind(ENVIRONMENTS));

function byName(env) {
    return ENVIRONMENTS[env];
}
function getDrivers() {
    return ENVIRONMENTS;
}

module.exports = {
    byName,
    getDrivers,
};
