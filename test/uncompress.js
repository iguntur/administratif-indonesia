import path from 'path';
import test from 'ava';
import fn from '../lib/uncompress';

test('uncompress', async t => {
	const x = await fn(path.resolve(__dirname, 'fixtures', 'compressed.json.gz'));

	t.true(typeof x === 'object');
	t.true(Array.isArray(x));

	x.forEach(res => {
		t.true(typeof res === 'object');
		t.true('Texts' in res);
	});
});
