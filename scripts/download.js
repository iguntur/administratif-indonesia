'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const got = require('got');
const pathEnsure = require('path-ensure');

const paths = pathEnsure();

/**
 * Download all PDF files
 *
 * link: http://www.kemendagri.go.id/pages/data-wilayah
 */

got('http://www.kemendagri.go.id/pages/data-wilayah')
	.then(res => res.body.match(/2015\/08\/18\/(.*?)\.pdf/g).map(
		links => url.resolve('http://www.kemendagri.go.id/media/filemanager/', links)
	))
	.then(links => {
		links.forEach(link => {
			paths('.tmp', 'pdf', path.basename(link))
				.then(fp => got.stream(link).pipe(fs.createWriteStream(fp)));
		});
	})
	.catch(err => {
		if (err) {
			if (err.response.body || err.response) {
				return console.error(err.response.body || err.response);
			}

			return console.error(err);
		}
	});
