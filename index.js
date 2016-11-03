
var es = require('./elasticsearch')();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:3000
app.get('/', function(req, res, next) {
	res.status(200).json({ hello: 'world'});
});

//curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:3000/ping
app.get('/ping', function(req, res, next) {
  es.ping(function(data){
    res.status(200).json( {data:data} );
  });
});

// curl -d '{"term":"villa"}' -H "Content-Type: application/json" http://127.0.0.1:3000/
app.post('/search', function(req, res, next) {
  //console.log(req.body.term);
  //res.json(req.body);
  es.searchDocument(req.body.term, function(data){
    res.status(200).json( {data:data} );
  });
});

/*
app.get('/users/:id', function(req, res, next) {
	res.send(req.params.id);
	console.log(req.params.id);
});

app.get('/search/:id', function(req, res, next) {
  
  es.searchDocument(req.params.id, function(data){
    res.status(200).json( {data:data} );
  });

});
*/

app.listen(3000);

console.log('Express started on port 3000');