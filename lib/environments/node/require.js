'use strict';

const internal  = require('./internal');
const loaders   = require('./loaders');
const fsutils   = require('./fsutils');

function require(file, path) {
    // as described in
    // https://nodejs.org/api/modules.html#modules_all_together

    let contents;

    // this is done so that discovery can start from the current
    // working directory
    path            = path ||
                      process.cwd();

    if (internal.isInternal(file)) {
        // do something
        contents    = 'whatever';
    } else if (fsUtil.isPath(file)) {
        const full  = path + file;
        contents    = loaders.loadAsFile(full) ||
                      loaders.loadAsDirectory(full);
    } else {
        contents    = tryToFind(file, path);
    }

    if (!contents) {

    }

    return contents;
}
