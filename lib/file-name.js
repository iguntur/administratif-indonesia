'use strict';

module.exports = filename => {
	return filename
		.replace(/([\.|-|_]+)/g, '-')
		.replace(/([\-]+)/g, '-')
		.replace(/(^[-]+|\-$)/g, '')
		.toLowerCase();
};
