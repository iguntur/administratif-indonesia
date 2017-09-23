'use strict';
const fs = require('fs');
const del = require('del');
const util = require('util');
const paths = require('../lib/paths');
const builder = require('../lib/builder');

const fsP = {
	writeFile: util.promisify(fs.writeFile)
};

const saveAs = (filepath, data) => {
	data = JSON.stringify(data, null, '\t');
	return fsP.writeFile(filepath, data);
};

const buildDist = (stats) => {
	stats.forEach(obj => {
		saveAs(paths('dist', obj.filename), obj.ctx)
	});
};

del([paths('dist')]);

builder.run()
	.then((stats) => {
		buildDist(stats);
	})
	.catch(err => {
		console.error(err);
		process.exit(1); // eslint-disable-line unicorn/no-process-exit
	});
