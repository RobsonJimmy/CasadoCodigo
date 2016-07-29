var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

http.get(configuracoe, function(res){
    console.log(res.statusCode);
    res.on('data', function(body){
        console.log('Corpo' +body);
    });
});