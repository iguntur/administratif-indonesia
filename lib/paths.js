'use strict';
const fs = require('fs')
const path = require('path')
const makeDir = require('make-dir');

const cwd = path.resolve(__dirname, '..');

function dir(fp) {
	const dirname = path.dirname(fp);
	const basename = path.basename(fp) === path.basename(dirname) ? '' : path.basename(fp);

	if (!fs.existsSync(dirname)) {
		makeDir.sync(dirname);
	}

	return { dirname, basename };
}

module.exports = (...fp) => {
	const { dirname, basename } = dir(path.resolve(cwd, ...fp || ''));

	return path.join(dirname, basename);
};
