//importando pacotes
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Produto = require('./app/models/produto');

//Conexão com o Banco (Cloud - MLAB)
mongoose.connect('mongodb://TonyMM:omm970334@ds040089.mlab.com:40089/banco1');

//configurar a aplicação para usar o body-parser
//esta parte pega rota
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Defindo a porta onde o servidor vai respoder

var port = process.env.port || 8000;

//Definindo as rotas
var router = express.Router(); // intercepta todas as rotas -> vai bater aqui primeiro

router.get('/',function(req,res)//
{
    res.json({'message':'ok, rota principal funcionando'});//responder com um json

});

// CRiar uma rota para o Produto
// Create
router.route('/produtos')
    .post(function(req, res){

        var produto = new Produto();
        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.descricao = req.body.descricao;

        produto.save(function(error){
            if(error)
                res.send("Erro ao tentar salvar o produto"+ error);

            res.json({message:"Produto inserido com sucesso"});
        });
    });


// criar um padrao pra as api // Vincula ao express -- Vinculo da app com o motor de rotas
//definindo uma rota padrao para as minhas apis
app.use('/api',router);

app.listen(port);
console.log("Api up and running! on port"+port);