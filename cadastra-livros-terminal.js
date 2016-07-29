var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'post',
    headers: {
        'Accept':'application/json',
        'Content-type': 'application/json'
    }
};


var client = http.request(configuracoes, function(res){
    if(res.statusCode == 400)
    {
        console.log('Bad request');
    }

    res.on('data', function(body){
        console.log('Corpo' +body);
    });
});

var produto = {
    titulo: '',
    descricao: 'node, javascript e um pouco sobre http',
    preco: 100
};

client.end(JSON.stringify(produto));