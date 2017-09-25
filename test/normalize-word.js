import test from 'ava';
import fn from '../lib/normalize-word';

test('string', t => {
	t.true(typeof fn('x') === 'string');
	t.is(fn('f o o'), 'foo');
	t.is(fn('f  o  o  b  a  r             b a z'), 'foobarbaz');
	t.is(fn('foo    bar'), 'foo bar');
	t.is(fn('    foo   bar   '), 'foo bar');
	t.is(fn('FOO.   bar'), 'FOO. bar');
	t.is(fn('F . O . O . B . A . R'), 'F.O.O.B.A.R');

	t.is(fn('ba r baz'), 'ba r baz');
	t.is(fn('foo bar'), 'foo bar');
	t.is(fn('FOO bar'), 'FOO bar');
	t.is(fn('FOO. bar'), 'FOO. bar');
	t.is(fn('foo B.A.R'), 'foo B.A.R');
});

test('Array<string>', t => {
	const fixtures = [
		'ba r az',
		'foo bar',
		'foo bar baz',
		'f o o b a a z'
	];

	t.deepEqual(fn(fixtures), [
		'ba r az',
		'foo bar',
		'foo bar baz',
		'foobaaz'
	]);
});
