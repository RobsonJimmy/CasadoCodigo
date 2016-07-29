var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function(){

    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query("DELETE FROM LIVROS", function(ex, result){
            if(!ex){
                done();
            }
        });
    });

    it('#Listagem json', function(done){
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200,done)
    });

    it('#Cadastro de novo produto com dados inválidos', function(done){
        request.post('/produtos')
        .send({titulo:"", descricao:"novo livro"})
        .expect(400,done)
    });

    it('#Cadastro de novo produto com dados válidos', function(done){
        request.post('/produtos')
        .send({titulo:"livro bom", descricao:"novo livro", preco:10.20})
        .expect(302,done)
    });
});