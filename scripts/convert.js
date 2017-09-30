'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const {Transform} = require('stream');
const PDFParser = require('pdf2json');
const cache = require('../lib/cache');

class StringifyStream extends Transform {
	constructor() {
		super();
		// An example from 'pdf2json' source code:
		// https://github.com/modesty/pdf2json/blob/master/lib/p2jcmd.js#L45-L56
		this._readableState.objectMode = false;
		this._writableState.objectMode = true;
	}

	_transform(obj, encoding, done) {
		try {
			this.push(JSON.stringify(obj));
			done();
		} catch (err) {
			done(err);
		}
	}
}

try {
	fs.readdirSync(path.resolve('.tmp', 'pdf')).forEach(filename => {
		fs.createReadStream(path.resolve('.tmp', 'pdf', filename))
			.pipe(new PDFParser())
			.pipe(new StringifyStream())
			.pipe(zlib.createGzip())
			.pipe(cache.write.stream(`${path.parse(filename).name}.json.gz`));
	});
} catch (err) {
	console.error(err);
	process.exit(1); // eslint-disable-line unicorn/no-process-exit
}
