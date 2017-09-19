import test from 'ava';
import chunk from '../lib/chunk';

test('throws', t => {
	t.throws(() => chunk(), TypeError);
	t.throws(() => chunk(''), TypeError);
	t.throws(() => chunk({}), TypeError);
});

test('return array', t => {
	t.true(typeof chunk([]) === 'object');
	t.true(Array.isArray(chunk([])));
});

test('empty values', t => {
	t.true(chunk([]).length === 0);
	t.deepEqual(chunk([]), []);
});

test('invalid values - no code', t => {
	t.true(chunk(['foo', 'bar', 'baz']).length === 0);
	t.deepEqual(chunk(['foo', 'bar', 'baz']), []);
	t.notDeepEqual(chunk(['foo', 'bar', 'baz']), ['foo', 'bar', 'baz']);
});

test('short reverse', t => {
	t.deepEqual(chunk(['FOO BAR', '31']), [['31', 'FOO BAR']]);
	t.deepEqual(chunk([
		'Foo Bar',
		'Baz',
		'31.01.01',
		'Foo Bar',
		'31.01.01.1001',
		'12 Bar',
		'31.01.01.1002'
	]), [
		['31.01.01.1002', '12 Bar'],
		['31.01.01.1001', 'Foo Bar'],
		['31.01.01', 'Baz', 'Foo Bar']
	]);
});

test('long reverse', t => {
	const fixtures = [
		'FOO BAR',
		'31',
		'FOO. BAR. BAZ. QUUX',
		'31.01',
		'Foo Bar',
		'Baz',
		'31.01.01',
		'Foo Bar',
		'31.01.01.1001',
		'12 Bar',
		'31.01.01.1002',
		'Baaz Quux',
		'31.01.01.1003',
		'Foo Bar',
		'Quux.',
		'31.01.02',
		'Foo B Quux',
		'31.01.02.1001',
		'1 Baaz',
		'31.01.01.1009'
	];

	const expected = [
		['31.01.01.1009', '1 Baaz'],
		['31.01.02.1001', 'Foo B Quux'],
		['31.01.02', 'Quux.', 'Foo Bar'],
		['31.01.01.1003', 'Baaz Quux'],
		['31.01.01.1002', '12 Bar'],
		['31.01.01.1001', 'Foo Bar'],
		['31.01.01', 'Baz', 'Foo Bar'],
		['31.01', 'FOO. BAR. BAZ. QUUX'],
		['31', 'FOO BAR']
	];

	t.deepEqual(chunk(fixtures)[0], expected[0]);
	t.deepEqual(chunk(fixtures), expected);
	t.notDeepEqual(chunk(fixtures), fixtures);
});
