'use strict';
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const pkg = require('../../package.json');

const pkgName = crypto.createHmac('md5', pkg.name).digest('hex');
const randomStr = (size = 12) => crypto.createHmac('md5', Math.random(size).toString()).digest('hex');

module.exports = (ext = '.txt') => path.format({
	dir: path.resolve(os.tmpdir(), pkgName, randomStr(6)),
	name: randomStr(),
	ext
});
