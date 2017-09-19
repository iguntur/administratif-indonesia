'use strict';

const STATE = {
	1: 'provinsi',
	2: 'kabupaten',
	3: 'kecamatan',
	4: 'kelurahan',
	5: 'desa'
};

const code = module.exports;

code.isValid = input => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected input 'code' to be of type 'string', got ${typeof input}.`);
	}

	const i = input.split('.').length;

	const patterns = {
		1: /^([\d]{2})$/,
		2: /^\(?([\d]{2})\)?[.]?([\d]{2})$/,
		3: /^\(?([\d]{2})\)?[.]?([\d]{2})[.]?([\d]{2})$/,
		4: /^\(?([\d]{2})\)?[.]?([\d]{2})[.]?([\d]{2})[.]?([\d]{4})$/
	};

	return patterns[i].test(input);
};

code.type = input => {
	if (!code.isValid(input)) {
		return null;
	}

	input = input.split('.');

	if (input.length === 4) {
		return input[3].charAt(0) === '1' ? STATE[4] : STATE[5];
	}

	return STATE[input.length];
};
