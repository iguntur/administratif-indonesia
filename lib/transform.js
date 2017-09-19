'use strict';

module.exports = pages => {
	if (typeof pages !== 'object') {
		throw new TypeError(`Expected 'pages' to be of type 'object', got ${typeof pages}.`);
	}

	pages = Array.isArray(pages) ? pages : [pages];

	return pages
		.filter(o => o.clr !== 1) // ignore text with '#ffffff' color
		.filter(o => o.x !== 44.131) // Exclude text column 'K E T E R A N G A N'
		.filter(o => o.y !== 35.872) // Exclude page number
		.map(o => {
			const {R} = o;
			const {T} = R.shift();

			return T;
		});
};
