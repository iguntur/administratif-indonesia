'use strict';

const normalizeWhiteSpace = str => str.trim().replace(/\s+/g, ' ');
const splitter = str => {
	return str
		.split(' ')
		.map(str => str.length === 1 ? str : null)
		.filter(Boolean);
};

module.exports = letters => {
	letters = Array.isArray(letters) ? letters : [letters];

	const strs = letters
		.map(str => splitter(str))
		.map((split, i) => {
			return split.length > 1 ? split.join('') : letters[i];
		});

	if (letters.length === 1) {
		return normalizeWhiteSpace(strs[0]);
	}

	return strs.map(normalizeWhiteSpace);
};
