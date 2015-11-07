'use strict';

const finder    = require('./finder');
const fsutils   = require('./fsutils');
const internal  = require('./internal');

function resolve(file, path) {
    // as described in
    // https://nodejs.org/api/modules.html#modules_all_together

    let result;

    // this is done so that resolve can start from the current
    // working directory
    path            = path ||
                      process.cwd();

    if (internal.isInternal(file)) {
        result      = file;
    } else if (fsutils.isPath(file)) {
        const full  = fsutils.join(path, file);
        result      = finder.findFile(full) ||
                      finder.findDirectory(full);
    } else {
        result      = finder.findModule(file, path);
    }

    return result;
}

module.exports = resolve;
