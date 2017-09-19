import test from 'ava';
import c from '../lib/code';

test('throws', t => {
	t.throws(() => c.isValid(), TypeError);
	t.throws(() => c.isValid([]), TypeError);
	t.throws(() => c.isValid({}), TypeError);
});

test('code.isValid()', t => {
	t.true(c.isValid('31'));
	t.true(c.isValid('10.11'));
	t.true(c.isValid('33.15.10'));
	t.true(c.isValid('11.13.15.6666'));

	t.false(c.isValid(''));
	t.false(c.isValid('a'));
	t.false(c.isValid(' '));
	t.false(c.isValid('.'));
	t.false(c.isValid('ab'));
	t.false(c.isValid('1'));
	t.false(c.isValid('123'));
	t.false(c.isValid('1234'));
	t.false(c.isValid('22.1'));
	t.false(c.isValid('22.333'));
	t.false(c.isValid('22.22.333'));
	t.false(c.isValid('22.22.22.1'));
	t.false(c.isValid('22.22.22.22'));
	t.false(c.isValid('22.22.22.333'));
	t.false(c.isValid('22.22.22.55555'));
});

test('code.type()', t => {
	t.is(c.type('31'), 'provinsi');
	t.is(c.type('31.01'), 'kabupaten');
	t.is(c.type('31.01.10'), 'kecamatan');
	t.is(c.type('31.01.10.1001'), 'kelurahan');
	t.is(c.type('31.01.10.2001'), 'desa');

	t.is(c.type('1'), null);
	t.is(c.type('333'), null);
	t.is(c.type('22.1'), null);
	t.is(c.type('22.22.333'), null);
	t.is(c.type('22.22.22.333'), null);
});
