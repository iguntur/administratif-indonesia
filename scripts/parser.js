'use strict';
const fs = require('fs');
const path = require('path');
const {Transform} = require('stream');
const PDFParser = require('pdf2json');
const paths = require('../lib/paths');

class JSONStringifyStream extends Transform {
	constructor() {
		super();

		this._readableState.objectMode = false;
		this._writableState.objectMode = true;
	}

	_transform(obj, encoding, done) {
		this.push(JSON.stringify(obj, null, 2));

		done();
	}
}

fs.readdir(paths('.cache/pdf'), (err, files) => {
	if (err) {
		throw err;
	}

	files.forEach(filename => {
		fs.createReadStream(paths('.cache/pdf', filename))
			.pipe(new PDFParser())
			.pipe(new JSONStringifyStream())
			.pipe(fs.createWriteStream(paths('.cache/json', `${path.parse(filename).name}.json`)));
	});
});
