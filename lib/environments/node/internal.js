'use strict';

const _                 = require('underscore');

const INTERNAL_MODULES  = [
    'assert',
    'child_process',
    'cluster',
    'crypto',
    'dgram',
    'dns',
    'domain',
    'events',
    'fs',
    'http',
    'https',
    'net',
    'os',
    'path',
    'process',
    'punycode',
    'querystring',
    'readline',
    'repl',
    'smalloc',
    'stream',
    'string_decoder',
    'timers',
    'tls',
    'tty',
    'udp',
    'url',
    'util',
    'v8',
    'vm',
    'zlib',
];

module.exports.isInternal   = _.contains.bind(_, INTERNAL_MODULES);
