/*!
 * request-all <https://github.com/tunnckoCore/request-all>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var extend = require('extend-shallow')
var parseLink = require('parse-link-header')

/**
 * > Perform multiple requests until the last
 * page of data has been retrieved.
 *
 * **Example**
 *
 * ```js
 * const requestAll = require('request-all')
 * requestAll('https://api.github.com/users/tunnckoCore/repos', (err, data) => {
 *   if (err) return console.error(err)
 *   console.log(data.length) // => 200+ repos
 * })
 * ```
 *
 * @name  requestAll
 * @param  {Function|String|Object} `url` the `simple-get` function, url, or object
 * @param  {Object} `[opts]` optional options, `url` and `opts` are merged if both are objects
 * @param  {Function} `<cb>` callbackfunction, you can pass it as second argument
 * @return {Function} the `simple-get` function, only if given as first argument, `undefined` otherwise
 * @api public
 */
module.exports = function requestAll (url, opts, cb) {
  if (typeof url === 'function') {
    if (typeof url.concat !== 'function') {
      throw new TypeError('request-all: missing concat method')
    }
    url.requestAll = factory(url)
    return url
  }

  factory(require('simple-get'))(url, opts, cb)
}

function factory (simpleGet) {
  return function simpleRequestAll (url, opts, callback) {
    callback = typeof opts === 'function' ? opts : callback
    opts = normalize(url, opts, callback)
    requestAll(opts, simpleGet, callback)
  }
}

/**
 * Normalize and validate arguments and options
 *
 * @param  {String|Object} `url`
 * @param  {Object} `opts`
 * @param  {Function} `callback`
 * @return {Object}
 */
function normalize (url, opts, callback) {
  url = typeof url === 'string' ? {url: url} : url
  opts = extend(url, opts)

  if (typeof opts.url !== 'string') {
    throw new TypeError('request-all: missing request url')
  }
  if (typeof callback !== 'function') {
    throw new TypeError('request-all: expect a callback')
  }

  opts.url = normalizeUrl(opts.url)
  opts.json = typeof opts.json === 'boolean' ? opts.json : true
  opts.headers = extend({
    'accept': 'application/json',
    'user-agent': 'https://github.com/tunnckoCore/request-all'
  }, opts.headers)

  return opts
}

/**
 * Normalize URL query
 *
 * @param  {String} `url`
 * @return {String}
 */
function normalizeUrl (url) {
  if (!url || /per_page=/.test(url)) return url
  /* istanbul ignore next */
  if ((/&/.test(url) && !/&$/.test(url)) || (!/\?$/.test(url) && /\?/.test(url))) {
    return url + '&per_page=100'
  }
  return /\?$/.test(url) ? url + 'per_page=100' : url + '?per_page=100'
}

/**
 * Multiple request logic
 *
 * @param  {Object} `opts`
 * @param  {Function} `simpleGet`
 * @param  {Function} `callback`
 */
function requestAll (opts, simpleGet, callback) {
  simpleGet.concat(opts, function (err, data, res) {
    if (err) return callback(err)
    data = opts.json === true ? tryParse(data) : data
    if (data instanceof Error) return callback(data)

    var links = parseLink(res.headers.link)
    if (links && links.next) {
      opts.url = links.next.url
      return requestAll(opts, simpleGet, function (err, res, response) {
        if (err) return callback(err)
        callback(null, data.concat(res), response)
      })
    }
    callback(null, data, res)
  })
}

/**
 * Catch JSON parse errors
 *
 * @param  {Buffer} `val`
 * @return {String|Array|Error}
 */
function tryParse (val) {
  var res = null
  try {
    res = JSON.parse(val.toString())
  } catch (err) {
    res = err
  }
  return res
}
