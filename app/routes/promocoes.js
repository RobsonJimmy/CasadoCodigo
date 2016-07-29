module.exports = function(app){
    app.get("/promocoes/form", function(req,res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        
        produtosDAO.lista(function(error,results,fields){
            res.render('promocoes/form',{lista:results});
        });
        connection.end();
    });

    app.post("/promocoes", function(req,res){
        var promocao = req.body;
        app.get('io').emit('novaPromocao', promocao); //chama o socket.on
        res.redirect('promocoes/form');
    });
}