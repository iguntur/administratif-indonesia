# Administratif Wilayah Indonesia
[![Build Status](https://travis-ci.org/iguntur/administratif-indonesia.svg?branch=master)](https://travis-ci.org/iguntur/administratif-indonesia) [![Coverage Status](https://coveralls.io/repos/github/iguntur/administratif-indonesia/badge.svg)](https://coveralls.io/github/iguntur/administratif-indonesia) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo) [![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-1e9eff.svg)](http://makeapullrequest.com)

> Daftar wilayah administratif Indonesia

---

## Table Of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
    - [Examples](#examples)
- [Browser](#browser)
- [Source](#source)

---


## Install

Install via [__`npm`__](https://npmjs.com) package manager

```console
$ npm install administratif-indonesia
```

or if you prefer using [__`yarn`__](https://yarnpkg.com) package manager

```console
$ yarn add administratif-indonesia
```


## Usage

```js
const AdministratifIndonesia = require('administratif-indonesia');
const ai = new AdministratifIndonesia();

console.log(JSON.stringify(ai.all(), null, '\t'));
/*
{
    "11-aceh": "/path/your-project/node_modules/administratif-indonesia/storages/11-aceh.json",
    "12-sumatera-utara": "/path/your-project/node_modules/administratif-indonesia/storages/12-sumatera-utara.json",
    // ...
}
*/

console.log(ai.get('51-bali'));
//=> /path/your-project/node_modules/administratif-indonesia/storages/51-bali.json
```

## API

### AdministratifIndonesia

Create a new instance of `AdministratifIndonesia`.

#### Instance

##### .path

Returns a `string` for full path of source directory. <br>
e.g: `/path/your-project/node_modules/administratif-indonesia/storages`

##### .size()

Returns a `number` of size values.

##### .all()

Returns an `object` for all values.

##### .get(key)

Returns a `string` for a specifie values of an input `key`, otherwise will returns `null`.

##### .has(key)

Returns a `boolean` value if key has exists.

###### key

- Type: `string`
- Default: `undefined`


### Examples

> __NOTE:__ Jika ukuran (size) data sangat besar, gunakanlah [`ReadableStreams`](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options).

#### Basic

```js
const ai = new AdministratifIndonesia();

// synchronous output
console.log(fs.readFileSync(ai.get('31-dki-jakarta'), 'utf8'));

// Readable Streams
fs.createReadStream(ai.get('31-dki-jakarta')).pipe(process.stdout);
```

#### Server

```js
const ai = new AdministratifIndonesia();

app.get('/api/administratif-indonesia/:identifier', (request, response) => {
    fs.createReadStream(ai.get(request.params.identifier))
        .pipe(response);
});
```


## Browser

Semua file [Administratif Indonesia](https://unpkg.com/administratif-indonesia/storages/) dapat di akses langsung via browser melalui [unpkg.com](https://unpkg.com).

👉 [https://unpkg.com/administratif-indonesia/storages/](https://unpkg.com/administratif-indonesia/storages/)

## Source

Mempertimbangkan beberapa sumber yang ada, librari ini menggunakan data yang bersumber dari [**Ditjen PUM Kemendagri**](http://www.kemendagri.go.id/pages/data-wilayah) (__Permendagri No. 137-2017__).


## Conclusions

Library ini hanyalah kumpulan file-file **`json`** yang dapat anda gunakan untuk program web interface anda sehingga dapat dengan mudah membangun **RESTful API** pada sisi server (_backend_) dan juga berinovasi pada sisi (_client_) untuk **UI/UX**.

Memperhatikan sumber yang digunakan, librari ini juga dapat menjadi sebuah data acuan untuk penilitian lebih lanjut.


## Related

- [Kemendagri](http://www.kemendagri.go.id) - Kementrian Dalam Negeri Republik Indonesia
- [(MFD Online) Badan Pusat Statistik](http://mfdonline.bps.go.id) - Sistem Pemutakhiran MFD dan MBS


## License

MIT © [Guntur Poetra](https://github.com/iguntur)
