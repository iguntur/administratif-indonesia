import fs from 'fs';
import path from 'path';
import util from 'util';
import stream from 'stream';
import test from 'ava';
import del from 'del';
import findCacheDir from 'find-cache-dir';
import cache from '../lib/cache';

const pkg = require('../package.json');

const CACHE_DIR = findCacheDir({name: pkg.name});
const fsP = {
	readFile: util.promisify(fs.readFile),
	readdir: util.promisify(fs.readdir)
};

test.serial(`cache`, async t => {
	t.true(typeof cache.dir === 'string');
	t.is(cache.dir, CACHE_DIR);
	t.true(fs.existsSync(cache.dir));
	t.true(cache.dir.includes(pkg.name));

	const files = await fsP.readdir(cache.dir);

	t.true(typeof files === 'object');
	t.true(Array.isArray(files));
});

test.serial(`cache.write()`, async t => {
	const fixturePath = 'fixtures/foo-bar.txt';

	await cache.write(fixturePath, '🌈');

	t.is(await fsP.readFile(path.join(CACHE_DIR, fixturePath), 'utf8'), '🌈');

	const files = await fsP.readdir(cache.dir);

	t.true(Array.isArray(files));
	t.true(files.length > 0);

	await del(path.join(CACHE_DIR, 'fixtures'));
});

test.serial(`cache.write.stream()`, t => {
	const x = cache.write.stream('fixtures/a.txt');

	t.true(x instanceof stream.Writable);
	t.true('on' in x);

	del.sync(path.join(CACHE_DIR, 'fixtures'));
});
