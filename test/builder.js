import path from 'path';
import test from 'ava';
import fn from '../lib/builder';

test('should return array[34] with attributes', async t => {
	const x = await fn.run();

	t.true(typeof x === 'object');
	t.true(Array.isArray(x));
	t.true(x.length === 34);

	x.forEach(res => {
		t.true('path' in res);
		t.true('data' in res);
		t.true(Array.isArray(res.data));
		t.is(path.extname(res.path), '.json');
	});
});

test('validate context', async t => {
	const x = await fn.run();

	x.forEach(res => {
		res.data.forEach(o => {
			t.true('code' in o);
			t.true('type' in o);
			t.true('name' in o);

			t.true(typeof o.code === 'string');
			t.true(typeof o.type === 'string');
			t.true(typeof o.name === 'string');

			t.true(o.name.length !== 0);
			t.true(o.name.length > 1);
			t.false(o.name.includes('%20'));
		});
	});
});
