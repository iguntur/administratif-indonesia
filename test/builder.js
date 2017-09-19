import path from 'path';
import test from 'ava';
import fn from '../lib/builder';

test('should return array[34] with attributes', async t => {
	const x = await fn.run();

	t.true(typeof x === 'object');
	t.true(Array.isArray(x));
	t.true(x.length === 34);

	x.forEach(res => {
		t.true('filename' in res);
		t.true('ctx' in res);
		t.true(Array.isArray(res.ctx));
		t.is(path.extname(res.filename), '.json');
	});
});

test('validate context', async t => {
	const x = await fn.run();

	x.forEach(res => {
		res.ctx.forEach(o => {
			t.true('id' in o);
			t.true('type' in o);
			t.true('value' in o);

			t.true(typeof o.id === 'string');
			t.true(typeof o.type === 'string');
			t.true(typeof o.value === 'string');

			t.true(o.value.length !== 0);
			t.true(o.value.length > 1);
			t.false(o.value.includes('%20'));
		});
	});
});
