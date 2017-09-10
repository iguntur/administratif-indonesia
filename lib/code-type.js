'use strict';

const STATE = {
	1: 'provinsi',
	2: 'kabupaten',
	3: 'kecamatan',
	4: 'kelurahan',
	5: 'desa',
};

module.exports = (code = '') => {
	code = code.trim().split('.');

	let type;

	if (code.length === 4) {
		type = code[3].charAt(0) === '1' ? STATE[4] : STATE[5];
	} else {
		type = STATE[code.length];
	}

	return { type };
};
