'use strict'

var config = require('./config')
var elasticsearch = require('elasticsearch')

module.exports = function () {
  var INDEX = config.elasticsearchserver.index
  var TYPE = config.elasticsearchserver.type
  var client = new elasticsearch.Client({
    host: config.elasticsearchserver.host + ':' + config.elasticsearchserver.port,
    log: config.elasticsearchserver.log
  })
  return {
    createDocument: function (body, callback) {
      client.create({
        index: INDEX,
        type: TYPE,
        id: body.id,
        body: {
          cp: body.cp,
          colonia: body.colonia,
          ciudad: body.ciudad,
          delegacion: body.delegacion,
          location: {
            lat: body.lat,
            lon: body.lon
          }
        }
      }, function (err, response) {
        if (err) {
          callback(err.message)
        }
        callback(response)
      })
    },
    searchDocument: function (term, callback) {
      var params = {
        index: INDEX,
        type: TYPE,
        body: {
          'size': 10,
          'query': {
            'match': {
              '_all': {
                'query': term,
                'operator': 'and'
              }
            }
          },
          'sort': [
            {'colonia': { 'order': 'asc', 'mode': 'avg' }}
          ]
        }
      }
      client.search(params).then(function (resp) {
        callback(resp.hits.hits)
      }, function (err) {
        callback(err.message)
      })
    },
    ping: function (callback) {
      var params = {
        requestTimeout: Infinity, // ping usually has a 3000ms timeout
        hello: 'elasticsearch!' // undocumented params are appended to the query string
      }
      client.ping(params).then(function (resp) {
        callback('All is well')
      }, function (err) {
        if (err) {
          callback('elasticsearch cluster is down!')
        }
      })
    },
    deleteDocument: function (id, callback) {
      client.delete({
        index: INDEX,
        type: TYPE,
        id: id
      }, function (err, response) {
        if (err) {
          callback(err.message)
        }
        callback(response)
      })
    },
    updateDocument: function (body, callback) {
      var doc = {
        cp: body.cp,
        colonia: body.colonia,
        ciudad: body.ciudad,
        delegacion: body.delegacion,
        location: {
          lat: body.lat,
          lon: body.lon
        }
      }
      var param = {
        index: INDEX,
        type: TYPE,
        id: body.id,
        body: {
          doc: doc
        }
      }
      client.update(param, function (err, response) {
        if (err) {
          callback(err.message)
        }
        callback(response)
      })
    },
    existsDocument: function (id, callback) {
      client.exists({
        index: INDEX,
        type: TYPE,
        id: id
      }, function (err, exists) {
        if (err) {
          callback('err: ' + err)
        }
        if (exists === true) {
          callback('exists: ' + exists)
        } else {
          callback('not found: ' + id)
        }
      })
    }
  }
}
