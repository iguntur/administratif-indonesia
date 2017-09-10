import os from 'os';
import fs from 'fs';
import crypto from 'crypto';
import p from 'path';
import test from 'ava';
import paths from '../lib/paths';

test('file exists', t => {
	const filename = crypto.createHmac('md5', new Date().toString()).digest('hex');
	const filepath = paths(os.tmpdir(), `${filename}.txt`);
	const x = p.resolve(os.tmpdir(), `${filename}.txt`);

	fs.writeFileSync(filepath, 'ツ');

	t.is(filepath, x);
	t.true(filepath === x);
	t.true(fs.existsSync(x));
});
