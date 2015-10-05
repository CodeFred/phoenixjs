'use strict';

var errors = [
    {
        'code':         'no-input-files',
        'suppressible': false,
        'level':        'fatal',
        'description':  'no input files',
    },
    {
        'code':         'file-not-found',
        'suppressible': false,
        'level':        'fatal',
        'description':  'file \'%s\' not found',
    },
    {
        'code':         'invalid-environment',
        'suppressible': false,
        'level':        'fatal',
        'description':  'environment \'%s\' not supported',
    },
    {
        'code':         'chosen-environment',
        'suppressible': true,
        'level':        'info',
        'description':  'using autodetected environment \'%s\'',
    }
];

module.exports = errors;
