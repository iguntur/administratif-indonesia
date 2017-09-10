import test from 'ava';
import code from '../lib/code-type';

test('code type', t => {
	t.is(code('31').type, 'provinsi');
	t.is(code('31.01').type, 'kabupaten');
	t.is(code('31.01.10').type, 'kecamatan');
	t.is(code('31.01.10.1001').type, 'kelurahan');
	t.is(code('31.01.10.2001').type, 'desa');
});
