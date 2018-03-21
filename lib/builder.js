'use strict';
const fs = require('fs');
const path = require('path');
const util = require('util');
const sortBy = require('lodash.sortby');
const kebabcase = require('lodash.kebabcase');
const code = require('./code');
const chunk = require('./chunk');
const transform = require('./transform');
const uncompress = require('./uncompress');
const textIgnores = require('./text-ignores');
const normalizeWord = require('./normalize-word');

const fsP = {
	readdir: util.promisify(fs.readdir)
};

function makeContext(tables) {
	const hasNextWord = val => (
		// Val[1].endsWith('%20');
		//   before: ['xyz' 'abc%20']
		//   after:  ['abc%20', 'xyz']
		val[1].endsWith('%20') ||
		// [33.06.12.2035]
		//   before: ['Z', 'ABC']
		//   after:  ['ABC', 'Z']
		val[0].length === 1
	);

	tables = tables.map(columns => columns.map(values => {
		const id = values.shift();
		values = values.filter(x => !x.startsWith('%20'));

		// [TODO]: remove this if unnecessary.
		textIgnores.forEach(x => {
			values = values.filter(v => v !== x);
		});

		if (values.length === 2) {
			// Swap values
			values = hasNextWord(values) ? [values[1] + values[0]] : [values[0]];
		}

		if (values.length > 2) {
			values = [values[0]];
		}

		return {
			code: id,
			type: code.type(id),
			name: normalizeWord(decodeURIComponent(values[0])).toUpperCase()
		};
	}));

	tables = tables.reduce((prev, after) => prev.concat(after));

	return sortBy(tables, 'code');
}

module.exports.run = async sources => {
	const files = await fsP.readdir(sources);

	return Promise.all(files.map(filepath => {
		return uncompress(path.join(sources, filepath)).then(result => {
			const data = makeContext(result.map(page => transform(page.Texts)).map(chunk));
			const obj = data.find(ctx => ctx.type === 'provinsi');

			return {
				path: `${kebabcase([obj.code, obj.name].join('-'))}.json`,
				data
			};
		});
	}));
};
