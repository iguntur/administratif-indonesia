'use strict';

module.exports = (...input) => {
	input = [...input].join(' ');

	return input
		.trim()
		.replace(/([\W_]+)/g, '-')
		.toLowerCase();
};
