'use strict';
const fs = require('fs');
const util = require('util');
const pathEnsure = require('path-ensure');
const findCacheDir = require('find-cache-dir');
const pkg = require('../package.json');

const CACHE_DIR = findCacheDir({name: pkg.name, create: true});
const paths = pathEnsure({cwd: CACHE_DIR});
const fsP = {
	writeFile: util.promisify(fs.writeFile)
};

exports.dir = CACHE_DIR;
exports.write = (filepath, data, options) => Promise.resolve()
	.then(() => paths(filepath))
	.then(fp => fsP.writeFile(fp, data, options));
exports.write.stream = filepath => fs.createWriteStream(paths.sync(filepath));
