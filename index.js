'use strict'

var express = require('express')
var app = express()
var es = require('./elasticsearch')()
var bodyParser = require('body-parser')
var config = require('./config')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:3000
app.get('/', function (req, res, next) {
  res.status(200).json({ hello: 'world' })
})

// curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:3000/ping
app.get('/ping', function (req, res, next) {
  es.ping(function (data) {
    res.status(200).json({ data: data })
  })
})

// curl -d '{"term":"villa"}' -H "Content-Type: application/json" http://127.0.0.1:3000/search
app.post('/search', function (req, res, next) {
  es.searchDocument(req.body.term, function (data) {
    res.status(200).json({ data: data })
  })
})

app.get('/exists_document/:id', function (req, res, next) {
  es.existsDocument(req.params.id, function (data) {
    res.status(200).json({ data: data })
  })
})

app.post('/update_document', function (req, res, next) {
  es.updateDocument(req.body, function (data) {
    res.status(200).json({ data: data })
  })
})

/*
app.get('/search/:id', function(req, res, next) {
  es.searchDocument(req.params.id, function(data){
    res.status(200).json( {data:data} );
  });
});
*/

app.listen(config.server.port)
console.log('Express started on port 3000')
