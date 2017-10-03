import fs from 'fs';
import path from 'path';
import test from 'ava';
import AI from '../';

const STORAGE_DIR = path.resolve(__dirname, '..', 'storages');

test('.path and .size', t => {
	const m = new AI();
	t.is(m.path, STORAGE_DIR);
	t.true(m.path.includes(STORAGE_DIR));

	const files = fs.readdirSync(m.path);
	t.true(files.length >= 34);
	t.true(files.length === m.size());
});

test('main method', t => {
	const m = new AI();

	t.true(typeof m.all() === 'object');
	t.false(Array.isArray(m.all()));
	t.true('index' in m.all());
	t.true(m.has('51-bali'));
	t.is(m.get(), null);
	t.is(m.get('index'), path.join(STORAGE_DIR, 'index.json'));
	t.true(m.get('73-sulawesi-selatan').includes('73-sulawesi-selatan.json'));
});
