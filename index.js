
var es = require('./elasticsearch')();

var express = require('express');
var app = express();

app.get('/', function(req, res, next) {
	res.status(200).json({ hello: 'world'});
});

app.get('/ping', function(req, res, next) {
  es.ping(function(data){
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