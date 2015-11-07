'use strict';

const _             = require('underscore');
const fs            = require('fs');
const path          = require('path');

const PATH_PREFIX   = ['./', '../'];
const MODULES_DIR   = 'node_modules';

// isPath
const starts        = (list, x) => _.some(list, pfx => x.startsWith(pfx));
const isPath        = p => p && (starts(PATH_PREFIX, p) || path.isAbsolute(p));

// exists
function exists(file) {
    try {
        return fs.statSync(file).isFile();
    } catch (e) {
        return false;
    }
}

module.exports = {
    basename:       path.basename,
    dirname:        path.dirname,
    exists:         exists,
    extname:        path.extname,
    isPath:         isPath,
    join:           path.join,
    MODULES_DIR:    MODULES_DIR,
};
