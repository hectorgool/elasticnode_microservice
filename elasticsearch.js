'use strict';

module.exports = function() {

  var elasticsearch = require('elasticsearch');
  
  var INDEX = 'mx';
  var TYPE = 'postal_code';

  var client = new elasticsearch.Client({
    host: '172.17.0.2:9200',
    log: 'trace'
  });
  
  return {
    
    createDocument: function( callback ) {

      client.create({
        index: INDEX,
        type: TYPE,
        id: '999999999',
        body: {
          cp: 208,
          colonia: 'xxx',
          ciudad: 'yyy',
          delegacion: 'zzz',
          location: {
            lat: 22.0074,
            lon: -102.2837
          }
        }
      }, function(err, response) {
        if (err) {
          callback(err.message);
        }
        callback(response);
      });

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
          'sort' : [
            { 'colonia' : { 'order' : 'asc', 'mode' : 'avg' } }
          ]
        }
      };

      client.search(params).then(function (resp){
        callback(resp.hits.hits);
      }, function (err) {
        callback(err.message);
      });

    },
    
    ping: function (callback) {

      var params = {    
        requestTimeout: Infinity, // ping usually has a 3000ms timeout 
        hello: 'elasticsearch!' // undocumented params are appended to the query string 
      };

      client.ping(params).then(function (resp) {
        callback('All is well');
      }, function (err) {
        callback('elasticsearch cluster is down!');
      });

    },
    
    deleteDocument: function (id, callback) {

      client.delete({
        index: INDEX,
        type: TYPE,
        id: id
      }, function(err, response) {

        if (err) {
          callback(err.message);
        }
        callback(response);

      });

    },
    
    updateDocument: function(id, callback){

      var doc = {
        cp         : 208,
        colonia    : 'zzzzz',
        ciudad     : 'aaaaa',
        delegacion : 'ccccc',
        location: {
          lat: 22.0074,
          lon: -102.2837
        }
      };

      var param = { 
        index: INDEX,
        type: TYPE,
        id : id, 
        body: {
          doc: doc
        }
      };

      client.update( param, function( err,response ) {

        if (err) {
          callback(err.message);
        }
        callback(response);

      });

    },
    
    existsDocument: function(id, callback){

      client.exists({
        index: INDEX,
        type: TYPE,
        id: id
      }, function (err, exists) {
        if (exists === true) {
          callback('exists: ' + exists);
        } else {
          callback('not found: ' + id);
        }
      });

    }
    
  }

};