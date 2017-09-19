'use strict';
const code = require('./code');

const isName = n => /^([a-zA-Z\d\s.]+)/.test(n);

module.exports = input => {
	if (!Array.isArray(input)) {
		throw new TypeError(`Expected 'input' to be of type 'Array<string>'.`);
	}

	const len = input.length;
	const arr = [];

	for (let i = len - 1; i >= 0; --i) {
		const chunks = [];
		const segment = input[i];

		if (code.isValid(segment)) {
			chunks.push(segment);
			arr.push(chunks);
		}

		if (arr[arr.length - 1] && !code.isValid(segment) && isName(segment)) {
			arr[arr.length - 1].push(segment);
		}
	}

	return arr;
};
