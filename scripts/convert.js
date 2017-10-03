'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const util = require('util');
const crypto = require('crypto');
const {Transform} = require('stream');
const Listr = require('listr');
const PDFParser = require('pdf2json');
const pathEnsure = require('path-ensure');
const findCacheDir = require('find-cache-dir');
const pkg = require('../package.json');

const CACHE_DIR = findCacheDir({name: pkg.name});
const paths = pathEnsure({cwd: CACHE_DIR});
const PDF_DIR = path.resolve(process.cwd(), '.tmp', 'pdf');
const fsP = {
	readdir: util.promisify(fs.readdir)
};

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

function hashFilename(input) {
	const hash = crypto.createHash('md5');

	hash.update(input);

	return `${hash.digest('hex')}.json.gz`;
}

const convert = filename => new Promise((resolve, reject) => {
	fs.createReadStream(path.join(PDF_DIR, filename))
		.pipe(new PDFParser())
		.on('end', resolve)
		.on('error', reject)
		.pipe(new StringifyStream())
		.pipe(zlib.createGzip())
		.pipe(fs.createWriteStream(paths.sync(hashFilename(filename))));
});

const tasks = new Listr([
	{
		title: 'Create cache files',
		skip: () => {
			if (!fs.existsSync(PDF_DIR) || fs.readdirSync(PDF_DIR).length !== 34) {
				return `PDF files doesn't exists or some files missing. Try to download 'npm run download'`;
			}
		},
		task: async () => {
			const files = await fsP.readdir(PDF_DIR);

			return new Listr(files.map(filename => ({
				title: `Convert '${filename}' to JSON and compress`,
				task: () => convert(filename)
			})));
		}
	}
]);

tasks.run().catch(err => {
	console.error(err);
	process.exit(1); // eslint-disable-line unicorn/no-process-exit
});
