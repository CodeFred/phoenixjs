'use strict';

const _         = require('underscore');
const errors    = require('../errors');

function autodetect(environments) {
    function discover() {
        let   files;
        const envs  = _.keys(environments);
        const env   = _.find(envs, env => files = environments[env].discover());

        // todo: if not env, error
        errors.raiseError('chosen-environment', env);

        return files;
    }

    return {
        discover,
    };
}

module.exports = autodetect;
