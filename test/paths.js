import fs from 'fs';
import path from 'path';
import test from 'ava';
import paths from '../lib/paths';

const pkg = require('../package.json');

const pkgCacheDir = path.resolve(process.cwd(), 'node_modules', '.cache', pkg.name);
const uniqTempFile = require('./helpers/uniq-temp-file');

test('paths()', t => {
	t.true(typeof paths === 'function');

	const tempfile = uniqTempFile();
	const filepath = paths(tempfile);

	t.is(filepath, tempfile);
	t.true(filepath === tempfile);

	fs.writeFileSync(filepath, 'ツ');
	t.true(fs.existsSync(filepath));
});

test('paths.cache()', t => {
	t.is(paths.cache(), pkgCacheDir);
	t.true(paths.cache() === pkgCacheDir);
	t.is(paths.cache('foo.txt'), path.join(pkgCacheDir, 'foo.txt'));
	t.true(paths.cache('foo.bar').endsWith('foo.bar'));
});
