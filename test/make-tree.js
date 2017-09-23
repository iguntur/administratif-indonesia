import test from 'ava';
import fn from '../lib/make-tree';

test('nested - 1', t => {
	const fixtures = [
		{code: '11', type: 'A', name: 'aa'},
		{code: '11.01', type: 'B', name: 'bb'}
	];

	const x = fn(fixtures);

	t.true(Array.isArray(x));
	t.true(x.length === 1);
	t.deepEqual(x, [{
		code: '11',
		type: 'A',
		name: 'aa',
		childrens: [{
			code: '11.01',
			type: 'B',
			name: 'bb'
		}]
	}]);
});

test('nested - 2', t => {
	const fixtures = [
		{code: '11', type: 'A', name: 'aa'},
		{code: '11.01', type: 'B', name: 'bb'},
		{code: '11.02', type: 'B', name: 'bb aa'}
	];

	const x = fn(fixtures);

	t.true(Array.isArray(x));
	t.true(x.length === 1);
	t.deepEqual(x, [{
		code: '11',
		type: 'A',
		name: 'aa',
		childrens: [{
			code: '11.01',
			type: 'B',
			name: 'bb'
		}, {
			code: '11.02',
			type: 'B',
			name: 'bb aa'
		}]
	}]);
});

test('deep nested - 1', t => {
	const fixtures = [
		{code: '11', type: 'A', name: 'aa'},
		{code: '11.01', type: 'B', name: 'bb'},
		{code: '11.01.01', type: 'C', name: 'cc'},
		{code: '11.01.01.2001', type: 'D', name: 'dd'}
	];

	const x = fn(fixtures);

	t.true(Array.isArray(x));
	t.deepEqual(x, [{
		code: '11',
		type: 'A',
		name: 'aa',
		childrens: [{
			code: '11.01',
			type: 'B',
			name: 'bb',
			childrens: [{
				code: '11.01.01',
				type: 'C',
				name: 'cc',
				childrens: [{
					code: '11.01.01.2001',
					type: 'D',
					name: 'dd'
				}]
			}]
		}]
	}]);
});

test('deep nested - 2', t => {
	const fixtures = [
		{code: '11', type: 'A', name: 'aa'},
		{code: '11.01', type: 'B', name: 'bb'},
		{code: '11.02', type: 'B', name: 'bb aa'},
		{code: '11.01.01', type: 'C', name: 'cc'},
		{code: '11.01.01.2001', type: 'D', name: 'dd'},
		{code: '11.01.01.2002', type: 'D', name: 'dd aa'}
	];

	const x = fn(fixtures);

	t.true(Array.isArray(x));
	t.deepEqual(x, [{
		code: '11',
		type: 'A',
		name: 'aa',
		childrens: [{
			code: '11.01',
			type: 'B',
			name: 'bb',
			childrens: [{
				code: '11.01.01',
				type: 'C',
				name: 'cc',
				childrens: [{
					code: '11.01.01.2001',
					type: 'D',
					name: 'dd'
				}, {
					code: '11.01.01.2002',
					type: 'D',
					name: 'dd aa'
				}]
			}]
		}, {
			code: '11.02',
			type: 'B',
			name: 'bb aa'
		}]
	}]);
});
