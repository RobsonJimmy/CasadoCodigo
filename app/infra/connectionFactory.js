var mysql = require('mysql');

function createDBConnection(){
    
    if(!process.env.NODE_ENV || process.env.node == 'dev')
    {
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '948298152Ba',
            database : 'casadocodigo_nodejs'
        });
    }
    if(process.env.NODE_ENV == 'test')
    {
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '948298152Ba',
            database : 'casadocodigo_nodejs_test'
        });
    }
    if(process.env.NODE_ENV == 'production')
    {
        return mysql.createConnection({
            host : 'us-cdbr-iron-east-04.cleardb.net',
            user : 'b7f0f69f3c7183',
            password : '1903027c',
            database : 'heroku_dbbffb9bbbd99e4'
        });
    }
}

module.exports = function(){
    return createDBConnection;
}