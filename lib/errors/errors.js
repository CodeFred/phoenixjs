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
    },
    {
        'code':         'autodetect-failed',
        'suppressible': false,
        'level':        'fatal',
        'description':  'unable to autodetected environment',
    },
    {
        'code':         'no-files-discovered',
        'suppressible': false,
        'level':        'fatal',
        'description':  'failed to discover entry points',
    },
];

module.exports = errors;
