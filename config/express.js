var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
    var app = express();

//trata recursos estáticos
    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    //process.env.NODE_ENV = 'production';

    //chegou requisicao p/ express -> function -> function -> expressValidator -> rota
    
    app.use(bodyParser.urlencoded({extended: true})); //funções aplicadas ao request na ordem definida - middleware
    app.use(bodyParser.json());
    app.use(expressValidator());

    
    
    //Url encoded - formato enviado ao servidor por default
    //extended = true - interpreta formulários complexos

    //req -> middlewareBodyParsers -> MiddlewareAutenticacao funcao que trata a requisicao

    load('routes', {cwd: 'app'}) //carregue tudo de routes
        .then('infra')
        .into(app);

    //colocar depois de invocar o express loader para não se aplicar esse middleware a todas as pages
    app.use(function(req,res,next){
        res.status(404).render('erros/404');
        next();
    });

    app.use(function(error,req,res,next){
        if(process.env.NODE_ENV == 'production')
        {
            res.status(500).render('erros/500');
            return;
        }
        next(error);
    });

    return app;   
}