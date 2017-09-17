var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'))

app.get('/', function(){
	res.render('public/index.html');
	res.end;	
} );

app.listen(3000);

