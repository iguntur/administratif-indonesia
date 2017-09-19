'use strict';
const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');
const pkg = require('../package.json');

function paths(opts) {
	opts = Object.assign({
		cwd: process.cwd()
	}, opts);

	return function () {
		const args = [opts.cwd].concat(Array.from(arguments));
		const pth = path.resolve.apply(null, args);

		if (!fs.existsSync(path.dirname(pth))) {
			makeDir.sync(path.dirname(pth));
		}

		return path.resolve(pth);
	};
}

module.exports = paths();
module.exports.cache = paths({
	cwd: path.resolve(process.cwd(), 'node_modules', '.cache', pkg.name)
});
