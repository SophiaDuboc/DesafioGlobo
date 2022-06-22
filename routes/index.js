var express = require('express');
var router = express.Router();

let gerador = require("../src/geradorDeHash")
let utils = require("../src/utils")
let validacoes = require("../src/validacoes")

const cors = require('cors')
const ENCURTAR = "Encurtar"
const EXCLUIR = "Excluir"


router.use(cors())

/* GET : Listar URLs*/
router.get('/', async function(req, res, next) {
  try {
    const result = await global.db.findAll();
    res.send(result);
  } catch (err) {
    res.status(500).send({"message": err.message});
  }
})

/* POST : cria/deleta nova URL */
router.post('/', async (req, res, next) => {
  try {
    const url = req.body.url;
    const acao = req.body.acao;

    if (acao == ENCURTAR){
      await validacoes.validaCriarUrl(url);
      var result = await criaUrl(url);
    }
    else if(acao == EXCLUIR){
      await validacoes.validaExclusao(url);
      var result = await deletaUrl(url);
    }
    else{
      res.status(400).send({"message": "Ação inválida"});
    }

    res.send(result);

  } catch (err) {
    res.status(500).send({"message": err});
  }
})

async function criaUrl(url){

  let hash = gerador.geraHash(url);
  const result = await global.db.insert(url, hash, utils.getDateNow());

  let urlCriada = global.baseUrl + "/" + hash;

  return {"urlCriada": urlCriada};
 
}

async function deletaUrl(url){
    const result = await global.db.deleteOne(url);
    return result;
}


/* /* /* /* /* /* /* /* /* /* /* /* /* REDIRECT /* /* /* /* /* /* /* /* /* /* /* /*
/* GET : Redireciona para URL original*/
router.get('/*', async (req, res, next) => {
  try {
    let hash = req.url.substring(1); /*  req.url = "/hash"  */
    let encurtador = (await global.db.findOne(hash));
    validacoes.validaRedirect(encurtador[0]);
    global.db.updateAcessos(encurtador[0], utils.getDateNow());
    res.redirect(encurtador[0].original);
    
  } catch (err) {
    res.status(404).send(err);
  }
})

module.exports = router;
