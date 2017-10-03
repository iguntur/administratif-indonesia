'use strict';
const fs = require('fs');
const path = require('path');

class AdministratifIndonesia {
	constructor() {
		this.path = path.resolve(__dirname, 'storages');
		this.store = Object.create(null);

		fs.readdirSync(this.path).forEach(filename => {
			this.store[path.parse(filename).name] = path.join(this.path, filename);
		});

		Object.defineProperty(this, 'store', {
			enumerable: false,
			configurable: false,
			writable: false
		});
	}

	all() {
		return this.store;
	}

	size() {
		return Object.keys(this.store).length;
	}

	has(key) {
		return key in this.store;
	}

	get(key) {
		return this.has(key) ? this.store[key] : null;
	}
}

module.exports = AdministratifIndonesia;
