var express = require('express');
var router = express.Router();
var PortifolioModel = require('../model/portfolio/PortfolioModel');
var RespostaClass = require('../model/RespostaClass');

router.get('/', function(req, res, next){
    PortifolioModel.getTodos(function(erro, retorno){
        let resposta = new RespostaClass();
        if (erro){
            resposta.erro = true;
            resposta.msg = 'Ocorreu um ERRO!!!';
            console.log('erro: ', erro);
        }else{
            resposta.dados = retorno;
        }
        res.json(resposta);
    })
});

router.get('/:id?', function(req, res, next){
    PortifolioModel.getId(req.params.id, function(erro, retorno){
        let resposta = new RespostaClass();
        if (erro){
            resposta.erro = true;
            resposta.msg = 'Ocorreu um ERRO!!!';
            console.log('erro: ', erro);
        }else{
            resposta.dados = retorno;
        }
        res.json(resposta);
    })
});

router.post('/?', function(req, res, next){
    PortifolioModel.adicionar(req.body, function(erro, retorno){
        let resposta = new RespostaClass();
        if (erro){
            resposta.erro = true;
            resposta.msg = 'Ocorreu um ERRO!!!';
            console.log('erro: ', erro);
        }else{
            if (retorno.affectedRows > 0){
                resposta.msg = 'Cadastro realizado com sucesso...';
            }else{
                resposta.erro = true;
                resposta.msg = 'Não foi possível ralizar a operação!!!';
            }
        }
        console.log('erro: ', resposta);
        res.json(resposta);
    })
});

router.delete('/:id', function(req, res, next){
    PortifolioModel.deletar(req.params.id, function(erro, retorno){
        let resposta = new RespostaClass();
        if (erro){
            resposta.erro = true;
            resposta.msg = 'Ocorreu um ERRO!!!';
            console.log('erro: ', erro);
        }else{
            if (retorno.affectedRows > 0){
                resposta.msg = 'registro excluido com sucesso...';
            }else{
                resposta.erro = true;
                resposta.msg = 'Não foi possível excluir o registro!!!';
            }
        }
        console.log('erro: ', resposta);
        res.json(resposta);
    })
});

router.put('/', function(req, res, next){
    PortifolioModel.editar(req.body, function(erro, retorno){
        let resposta = new RespostaClass();
        if (erro){
            resposta.erro = true;
            resposta.msg = 'Ocorreu um ERRO!!!';
            console.log('erro: ', erro);
        }else{
            if (retorno.affectedRows > 0){
                resposta.msg = 'registro atualizado com sucesso...';
            }else{
                resposta.erro = true;
                resposta.msg = 'Não foi possível editar o registro!!!';
            }
        }
        console.log('erro: ', resposta);
        res.json(resposta);
    })
});

module.exports = router;