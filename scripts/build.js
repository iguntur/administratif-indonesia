'use strict';
const fs = require('fs');
const del = require('del');
const paths = require('../lib/paths');
const builder = require('../lib/builder');

Promise.resolve()
	.then(() => del([paths('dist')]))
	.then(() => {
		builder.run().then(results => results.forEach(res => {
			const ws = fs.createWriteStream(paths('dist', res.filename));
			ws.write(JSON.stringify(res.ctx, null, '\t'));
			ws.end('\n');
		}));
	})
	.catch(err => {
		console.error(err);
		process.exit(1); // eslint-disable-line unicorn/no-process-exit
	});
