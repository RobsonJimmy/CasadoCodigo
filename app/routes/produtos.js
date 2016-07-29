module.exports = function(app){
    var listaProdutos = function(req, res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection); //carrega modulo usando express load com um novo contexto
        //invocar funcao lista
        produtosDAO.lista(function(err, results, next){
            if(err)
            {
                return next(err);
            }

            res.format({
                html: function(){
                    res.render('produtos/lista', {lista: results});//renderisa a página produtos com a lista de produtos.
                },
                json: function(){
                    res.json(results);
                }
            });
        });
        connection.end();
    };

    app.get('/produtos', listaProdutos);

    app.get('/produtos/form', function(req, res){
        res.render('produtos/form', 
            {
                errosValidacao: {}, 
                produto: {}
            }
        );
    });

    app.post('/produtos', function (req, res) {
        
        var produto = req.body;  

        req.assert('titulo', 'Título é obrigatório').notEmpty(); //assert - afirmação de alguma condição
        req.assert('preco', 'Formato inválido').isFloat();

        var erros = req.validationErrors(); //retorna json com erros de validação

        if(erros)
        {
            res.format({
                html: function(){
                    res.status(400).render('produtos/form', {errosValidacao: erros, produto: produto});//errosValidacao - nome da chave
                },
                json: function(){
                    res.status(400).json(erros);
                }
            });  
            return; //não continua nessa função
        }
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.salva(produto, function(err, results){
            res.redirect('/produtos')
        });
    });
}