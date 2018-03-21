'use strict';
const fs = require('fs');
const path = require('path');
const util = require('util');
const got = require('got');
const unzip = require('unzip');
const {JSDOM} = require('jsdom');
const pathEnsure = require('path-ensure');

const cwd = path.dirname(__dirname);
const paths = pathEnsure({cwd});
const fsP = {
	writeFile: util.promisify(fs.writeFile),
	readFile: util.promisify(fs.readFile)
};

const KEMENDAGRI_DATA_LINK = 'http://www.kemendagri.go.id/pages/data-wilayah';

/**
 * Download all PDF files
 *
 * link: http://www.kemendagri.go.id/pages/data-wilayah
 */

async function getHtml() {
	const filepath = await paths('.tmp', 'html', 'file.html');
	const isCached = fs.existsSync(filepath);

	if (isCached) {
		return fsP.readFile(filepath, 'utf8');
	}

	try {
		const response = await got(KEMENDAGRI_DATA_LINK);

		await fsP.writeFile(filepath, response.body, 'utf8');

		return getHtml();
	} catch (err) {
		if (err.response.body || err.response) {
			return Promise.reject(err.response.body || err.response);
		}

		return Promise.reject(err);
	}
}

function downloadFromKemendagri(url) {
	const opts = {url};

	const urlFilter = /\.(pdf|zip)$/g;

	if (!opts.url || !urlFilter.test(opts.url)) {
		return;
	}

	const filename = path.basename(opts.url);

	paths('.tmp', 'pdf', filename).then(filepath => {
		if (filepath.endsWith('.pdf')) {
			got.stream(opts.url)
				.pipe(fs.createWriteStream(filepath));
		}

		if (filepath.endsWith('.zip')) {
			got.stream(opts.url)
				.pipe(unzip.Extract({path: path.dirname(filepath)})); // eslint-disable-line new-cap
		}
	});
}

getHtml()
	.then(body => {
		const {window} = new JSDOM(body);
		const selector = window.document.querySelector('ol').getElementsByTagName('a');
		const link = {
			googleDrive: {},
			kemendagri: {}
		};

		for (const a of selector) {
			if (a.href.includes('drive.google.com')) {
				link.googleDrive[a.textContent] = a.href;
			} else if (a.href.includes('kemendagri.go.id')) {
				link.kemendagri[a.textContent] = a.href;
			}
		}

		Object.values(link.kemendagri).forEach(downloadFromKemendagri);

		console.log();
		console.log('Download manualy from google drive.\n');
		console.log(JSON.stringify(link.googleDrive, null, 4));
		console.log();
	})
	.catch(err => {
		return console.error(err);
	});
