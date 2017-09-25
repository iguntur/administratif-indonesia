'use strict';
const fs = require('fs');
const util = require('util');
const sortBy = require('lodash.sortby');
const code = require('./code');
const slug = require('./slug');
const paths = require('./paths');
const chunk = require('./chunk');
const transform = require('./transform');
const getSource = require('./get-source');
const textIgnores = require('./text-ignores');
const normalizeWord = require('./normalize-word');

const fsP = {
	readdir: util.promisify(fs.readdir)
};

function makeContext(tables) {
	tables = tables.map(columns => columns.map(values => {
		const id = values.shift();
		values = values.filter(x => !x.startsWith('%20'));

		// Temp
		textIgnores.forEach(x => {
			values = values.filter(v => v !== x);
		});

		if (values.length === 2) {
			// Concat string
			// values[0].length === 0; => [33.06.12.2035]
			if (values[1].endsWith('%20') || values[0].length === 1) {
				values = [values[1] + values[0]];
			} else {
				values = [values[0]];
			}
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

module.exports.run = async () => {
	const files = await fsP.readdir(paths.cache());

	return Promise.all(files.map(filename => {
		return getSource(paths.cache(filename)).then(result => {
			const data = makeContext(result.map(page => transform(page.Texts)).map(chunk));
			const obj = data.find(ctx => ctx.type === 'provinsi');

			return {
				path: `${slug(obj.code, obj.name)}.json`,
				data
			};
		});
	}));
};
