# Administratif Wilayah Indonesia
[![Build Status](https://travis-ci.org/iguntur/administratif-indonesia.svg?branch=master)](https://travis-ci.org/iguntur/administratif-indonesia) [![Coverage Status](https://coveralls.io/repos/github/iguntur/administratif-indonesia/badge.svg)](https://coveralls.io/github/iguntur/administratif-indonesia) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Daftar wilayah administratif Indonesia

---

## Table Of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)

---


## Install

Using [__`npm`__](https://npmjs.com)

```
$ npm install administratif-indonesia
```

or if you prefer using [__`yarn`__](https://yarnpkg.com) package manager

```
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

##### key

- Type: `string`
- Default: `undefined`


## License

MIT © [Guntur Poetra](http://iguntur.starmediateknik.com)
