'use strict';

var options = [
    {
        'long':     'max-errors',
        'type':     'number',
        'help':     'Sets the maximum number of errors reported',
        'default':  9
    },
    {
        'long':     'environment',
        'short':    'env',
        'type':     'string',
        'help':     'Sets the runtime environment',
        'default':  'autodetect',
    }
];

function normalize(options, callback) {
    return options.reduce(callback, {});
}

function cli(target, element) {
    target[element.long] = [
        element.short || false,
        element.help,
        element.type,
        element.default,
    ];
    return target;
}

module.exports = normalize(options, cli);
