import test from 'ava';
import fn from '../lib/transform';

test('throws', t => {
	t.throws(() => fn(), TypeError);
	t.throws(() => fn(''), TypeError);
});

test('single item', t => {
	const x = fn({
		x: 5.75, y: 8.953, w: 983.052, sw: 0.32553125, clr: 0, A: 'left',
		R: [{T: 'DKI%20JAKARTA', S: -1, TS: [0, 145, 1, 0]}]
	});

	t.true(typeof x === 'object');
	t.true(Array.isArray(x));
	t.deepEqual(x, ['DKI%20JAKARTA']);
});

test('exclude text `#ffffff` color - {clr: 1}', t => {
	const x = fn([{
		x: 42.125, y: 4.331, w: 4060.8, sw: 0.32553125, clr: 1, A: 'left',
		R: [{T: 'KODE%20DAN%20DATA%20WILAYAH%20ADMINISTRASI%20PEMERINTAHAN', S: -1, TS: [0, 144, 0, 0]}]
	}, {
		x: 5.75, y: 8.953, w: 983.052, sw: 0.32553125, clr: 0, A: 'left',
		R: [{T: 'DKI%20JAKARTA', S: -1, TS: [0, 145, 1, 0]}]
	}]);

	t.true(typeof x === 'object');
	t.true(Array.isArray(x));
	t.true(x.length === 1);
	t.deepEqual(x, ['DKI%20JAKARTA']);
});

test('exclude text in columns {x: 44.131} - table', t => {
	const x = fn([{
		x: 42.475, y: 10.109, w: 423, sw: 0.32553125, clr: 0, A: 'left',
		R: [{T: '%2025.385', S: -1, TS: [0, 145, 1, 0]}]
	}, {
		x: 44.131, y: 10.109, w: 896.25, sw: 0.36196875, clr: 0, A: 'left',
		R: [{T: 'UU%20No.%2029%2F2007', S: -1, TS: [0, 128, 0, 0]}]
	}, {
		x: 44.131, y: 19.169, w: 896.25, sw: 0.36196875, clr: 0, A: 'left',
		R: [{T: 'UU%20No.%2029%2F2007', S: -1, TS: [0, 128, 0, 0]}]
	}, {
		x: 2.219, y: 19.087, w: 317.25, sw: 0.32553125, clr: 0, A: 'left',
		R: [{T: '31.71', S: -1, TS: [0, 145, 1, 0]}]
	}]);

	t.true(x.length === 2);
	t.false(x.length === 4);
	t.deepEqual(x, ['%2025.385', '31.71']);
});

test('exclude page number - {y: 35.872}', t => {
	const x = fn([{
		x: 25.2, y: 34.272, w: 105.75, sw: 0.32553125, clr: 0, A: 'left',
		R: [{T: '%203', S: -1, TS: [0, 144, 0, 0]}]
	}, {
		x: 2.219, y: 34.331, w: 810.75, sw: 0.32553125, clr: 0, A: 'left',
		R: [{T: '31.71.03.1003', S: -1, TS: [0, 144, 0, 0]}]
	}, {
		x: 55.4, y: 35.872, w: 70.5, sw: 0.32553125, clr: 0, A: 'left',
		R: [{T: '1', S: -1, TS: [0, 144, 0, 0]}]
	}, {
		x: 55.4, y: 35.872, w: 70.5, sw: 0.32553125, clr: 0, A: 'left',
		R: [{T: '2', S: -1, TS: [0, 144, 0, 0]}]
	}]);

	t.true(typeof x === 'object');
	t.true(Array.isArray(x));
	t.true(x.length === 2);
	t.deepEqual(x, ['%203', '31.71.03.1003']);
});
