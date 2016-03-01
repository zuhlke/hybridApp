var express = require('express')();
var bodyParser = require('body-parser');
var cors = require('cors');

// security
express.use(cors());

// utilities
express.use(bodyParser.json({limit: '1mb'}));

express.get('/balances/:id', function(request, response){
    response.status(200).send({currentBalance: 634.67 });
});

express.listen(8888, function () {
    console.log('Example app listening on port 8888!');
});