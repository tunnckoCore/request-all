/*!
 * request-all <https://github.com/tunnckoCore/request-all>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var requestAll = require('./index')

function auth (str) {
  return {
    'authorization': 'Basic ' + new Buffer(str).toString('base64')
  }
}

test('should throw TypeError `missing concat method` when used as wrapper', function (done) {
  function fixture () {
    requestAll(function noop () {})
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /missing concat method/)
  done()
})

test('should throw TypeError if request url not a string', function (done) {
  function fixture () {
    requestAll({
      url: 123
    })
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /missing request url/)
  done()
})

test('should throw TypeError if not a callback', function (done) {
  function fixture () {
    requestAll('http://httpbin.org/ip', 123)
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect a callback/)
  done()
})

test('should works as standalone module which requires `simple-get`', function (done) {
  requestAll({
    url: 'https://api.github.com/users/fake-user123/repos',
    headers: auth('fake-user123:fakeuser123')
  }, function (err, data) {
    test.ifError(err)
    test.ok(data.length, 'expect `fake-user123` to have repos')
    done()
  })
})

test('should works as wrapper for `simple-get` and adds `.requestAll` method', function (done) {
  var simpleGet = requestAll(require('simple-get'))

  simpleGet.requestAll('https://api.github.com/users/jonschlinkert/repos', {
    headers: auth('fake-user123:fakeuser123')
  }, function (err, data) {
    test.ifError(err)
    test.strictEqual(data.length >= 700, true, 'expect `jonschlinkert` to have more than 700 repos')
    done()
  })
})

test('should pass error if json:true and content not json', function (done) {
  requestAll('http://httpbin.org/html', function (err, res) {
    test.ifError(!err)
    test.strictEqual(err.name, 'SyntaxError')
    done()
  })
})

test('should pass response if json:false and content not json', function (done) {
  requestAll('http://httpbin.org/html', {json: false}, function (err, buf) {
    test.ifError(err)
    var html = buf.toString()
    test.ok(html.indexOf('<html>'))
    done()
  })
})
