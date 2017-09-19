import test from 'ava';
import paths from '../lib/paths';
import fn from '../lib/get-source';

test('get sources', async t => {
	const x = await fn(paths.cache('31-dki-jakarta.json.gz'));

	t.true(typeof x === 'object');
	t.true(Array.isArray(x));

	x.forEach(res => {
		t.true(typeof res === 'object');
		t.true('Texts' in res);
	});
});
