# [request-all][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Performs a multiple requests and data from all pages are concatenated together and buffered until the last page of data has been retrieved. Use it as standalone module or as wrapper for simple-get - just pass simple-get.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## ProTips
- use `v1.x` if you want to use/pass `simple-get@1.x`, npm tagged as `latest-1`, branch `latest-1`
- use `v2.x` if you want to use/pass `simple-get@2.x`, npm tagged as `latest`, branch `master`

## Install
```
npm i request-all --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const requestAll = require('request-all')
```

### [requestAll](index.js#L35)
> Perform multiple requests until the last page of data has been retrieved.

**Params**

* `url` **{Function|String|Object}**: the `simple-get` function, url, or object    
* `[opts]` **{Object}**: optional options, `url` and `opts` are merged if both are objects    
* `<cb>` **{Function}**: callbackfunction, you can pass it as second argument    
* `returns` **{Function}**: the [simple-get][simple-get] function, only if given as first argument, `undefined` otherwise  

**Example**

```js
const requestAll = require('request-all')
requestAll('https://api.github.com/users/tunnckoCore/repos', (err, data) => {
  if (err) return console.error(err)
  console.log(data.length) // => 200+ repos
})
```

### Usage as wrapper
> If you pass [simple-get][simple-get] to it or any request library that
have `.concat` method, it just returns it and adds `.requestAll` method.

**Example**

```js
const simpleGet = require('request-all')(require('simple-get'))

simpleGet.requestAll('http://httpbin.org/ip', {json: false}, (err, buf) => {
  if (err) return console.error(err)
  console.log(buf.toString()) // => '{"origin": "33.125.89.244"}'
})
```

## Related
* [github-base](https://www.npmjs.com/package/github-base): Base methods for creating node.js apps that work with the GitHub… [more](https://www.npmjs.com/package/github-base) | [homepage](https://github.com/jonschlinkert/github-base)
* [simple-get](https://www.npmjs.com/package/simple-get): Simplest way to make http get requests. Supports HTTPS, redirects, gzip/deflate,… [more](https://www.npmjs.com/package/simple-get) | [homepage](https://github.com/feross/simple-get)
* [simple-get-stream](https://www.npmjs.com/package/simple-get-stream): Simply wraps `simple-get` and his methods to return Response stream instead… [more](https://www.npmjs.com/package/simple-get-stream) | [homepage](https://github.com/tunnckocore/simple-get-stream)
* [then-got](https://www.npmjs.com/package/then-got): Promisified `simple-get`. | [homepage](https://github.com/hybridables/then-got)

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/request-all/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[simple-get]: https://github.com/feross/simple-get

[npmjs-url]: https://www.npmjs.com/package/request-all
[npmjs-img]: https://img.shields.io/npm/v/request-all.svg?label=request-all

[license-url]: https://github.com/tunnckoCore/request-all/blob/master/LICENSE
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/request-all
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/request-all.svg

[travis-url]: https://travis-ci.org/tunnckoCore/request-all
[travis-img]: https://img.shields.io/travis/tunnckoCore/request-all/master.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/request-all
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/request-all.svg

[david-url]: https://david-dm.org/tunnckoCore/request-all
[david-img]: https://img.shields.io/david/tunnckoCore/request-all.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg