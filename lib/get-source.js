'use strict';
const fs = require('fs');
const zlib = require('zlib');

module.exports = filepath => new Promise(resolve => {
	const chunks = [];
	let ctx;

	fs.createReadStream(filepath)
		.pipe(zlib.createGunzip())
		.on('data', chunk => chunks.push(chunk))
		.on('finish', () => {
			ctx = Buffer.concat(chunks);
			ctx = JSON.parse(ctx).formImage.Pages.map(o => ({Texts: o.Texts}));
		})
		.on('end', () => {
			resolve(ctx);
		});
});
