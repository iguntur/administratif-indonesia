import test from 'ava';
import fn from '../lib/file-name';

test('filename', t => {
	t.is(fn('11._filename'), '11-filename');
	t.is(fn('11._file_name_'), '11-file-name');
	t.is(fn('11.file_name-'), '11-file-name');
	t.is(fn('11._file_name_3'), '11-file-name-3');
	t.is(fn('11._FILE_NAME_3'), '11-file-name-3');
	t.is(fn('11._FILE_name_3_'), '11-file-name-3');
	t.is(fn('FILE_name_3_'), 'file-name-3');
	t.is(fn('FILE_5_name_3_'), 'file-5-name-3');
	t.is(fn('__file_name_'), 'file-name');
	t.is(fn('--file_name_'), 'file-name');
	t.is(fn('--file___name_'), 'file-name');
	t.is(fn('--file_-_name_'), 'file-name');
	t.is(fn('--file_--name_'), 'file-name');
	t.is(fn('--file---name_'), 'file-name');
	t.is(fn('--file_-_name-_'), 'file-name');
	t.is(fn('--file_-_name___'), 'file-name');
	t.is(fn('--file_-_name---1'), 'file-name-1');
	t.is(fn('_-_file_-_name_-_1'), 'file-name-1');
});
