'use strict';

module.exports = input => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected 'input' to be of type 'string', got ${typeof input}`);
	}

	return input
		.trim()
		.replace(/([\W_]+)/g, '-')
		.toLowerCase();
};
