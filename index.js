var express = require('express');
var app = express();
app.set('view engine', 'pug')
var server = require('http').createServer(app);
var port = 8080;
var buAdapter = new(require('/home/ubuntu/workspace/libs/bu_adapter.js'))();

server.listen(port, function() {
    console.log('Server listening at port ' + port);
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    buAdapter.getBuses(function(resJson) {
        // console.log(JSON.stringify(resJson, null, 1));
        var busArr = resJson.ResultSet.Result;
        // 	res.sendFile(__dirname + '/index.html');
        res.render('index', { busses: busArr.map(x => JSON.stringify(x) ) })
    });


});
