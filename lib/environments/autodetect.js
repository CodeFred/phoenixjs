'use strict';

const _         = require('underscore');
const errors    = require('../errors');

function autodetect(environments) {
    function findFiles() {
        let   files;
        const envs  = _.keys(environments);
        const env   = _.find(envs, env => files = environments[env].findFiles());

        errors.raiseError('chosen-environment', env);

        return files;
    }

    return {
        findFiles,
    };
}

module.exports = autodetect;
