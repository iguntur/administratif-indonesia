import test from 'ava';
import fn from '../lib/slug';

test('throws', t => {
	t.throws(() => fn(), TypeError);
	t.throws(() => fn([]), TypeError);
	t.throws(() => fn({}), TypeError);
});

test('slugify', t => {
	t.is(fn('11.foo.bar'), '11-foo-bar');
	t.is(fn('11_foo_bar'), '11-foo-bar');
	t.is(fn('11-foo-bar'), '11-foo-bar');

	t.is(fn('11._foobar'), '11-foobar');
	t.is(fn('11_.foo_bar'), '11-foo-bar');
	t.is(fn('11_-_foo_bar_3'), '11-foo-bar-3');

	t.is(fn('1-foo-bar-2'), '1-foo-bar-2');
	t.is(fn('1_foo_bar_2'), '1-foo-bar-2');

	t.is(fn('1._foo_bar'), '1-foo-bar');
	t.is(fn('1._foo_bar_3'), '1-foo-bar-3');
	t.is(fn('1_._foo_bar'), '1-foo-bar');
	t.is(fn('1--foo-bar'), '1-foo-bar');

	t.is(fn('FOO-BAR'), 'foo-bar');
	t.is(fn('FOO_BAR'), 'foo-bar');
	t.is(fn('FOO.BAR'), 'foo-bar');
	t.is(fn('FOO_._BAR'), 'foo-bar');

	t.is(fn('  FOO-BAR  '), 'foo-bar');
	t.is(fn('  FOO-   BAR  '), 'foo-bar');
	t.is(fn('  FOO BAR  '), 'foo-bar');
});
