'use strict';
const fs = require('fs');
const path = require('path');
const util = require('util');
const del = require('del');
const pathEnsure = require('path-ensure');
const builder = require('../lib/builder');

const fsP = {
	writeFile: util.promisify(fs.writeFile)
};

const storage = (() => {
	const STORAGE_DIR = path.resolve(__dirname, '..', 'storages');
	const paths = pathEnsure({cwd: STORAGE_DIR});

	return {
		dir: STORAGE_DIR,
		write(filepath, data, options) {
			return paths(filepath).then(fp => {
				fsP.writeFile(fp, data, options);
			});
		}
	};
})();

const buildIndexProvince = stats => {
	const data = stats
		.map(stat => stat.data.filter(x => x.type === 'provinsi'))
		.reduce((p, c) => p.concat(c));

	storage.write('index.json', JSON.stringify(data, null, '\t'));
};

const buildDist = stats => {
	stats.forEach(stat => {
		storage.write(stat.path, JSON.stringify(stat.data, null, '\t'));
	});
};

del([path.join(storage.dir, '*')]);

builder.run()
	.then(stats => {
		buildDist(stats);
		buildIndexProvince(stats);
	})
	.catch(err => {
		console.error(err);
		process.exit(1); // eslint-disable-line unicorn/no-process-exit
	});
