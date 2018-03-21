'use strict';
const fs = require('fs');
const path = require('path');

class AdministratifIndonesia {
	constructor() {
		this.path = path.resolve(__dirname, 'storages');

		Object.defineProperty(this, '_store', {
			value: (obj => {
				fs.readdirSync(this.path).forEach(filename => {
					obj[path.parse(filename).name] = path.join(this.path, filename);
				});

				return obj;
			})({})
		});
	}

	all() {
		return this._store;
	}

	size() {
		return Object.keys(this._store).length;
	}

	has(key) {
		return key in this._store;
	}

	get(key) {
		return this.has(key) ? this._store[key] : null;
	}
}

module.exports = AdministratifIndonesia;
