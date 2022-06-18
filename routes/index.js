var express = require('express');
var router = express.Router();

let gerador = require("../src/geradorDeHash")
let utils = require("../src/utils")
let validacoes = require("../src/validacoes")


/* /* /* /* /* /* /* /* /* /* /* /* /* HOME PAGE /* /* /* /* /* /* /* /* /* /* /* /*
/* GET : Listar URLs*/
router.get('/', async (req, res, next) => {
  try {
    const allUrls = await global.db.findAll();
    res.status(200).send(allUrls);
  } catch (err) {
    next(err);
  }
})


/* POST : Deletar URL*/
router.post('/', async (req, res, next) => {
  try {
    const url = req.body.url;
    await validacoes.validaExclusao(url);
    const result = await global.db.deleteOne(url);
    console.log(result);
    res.redirect('/');
    return;
    
  } catch (err) {
    res.status(500).send({"message": err.message});
  }
})

/* /* /* /* /* /* /* /* /* /* /* /* /* PAGE NEW URL /* /* /* /* /* /* /* /* /* /* /* /*
/* GET : mostra form para criar nova URL*/
router.get('/new', (req, res, next) => {
  res.status(200)
  res.render('new', { title: 'Nova Url' });
});


/* POST : cria nova URL */
router.post('/new', async (req, res, next) => {
  try {
    const url = req.body.url;
    await validacoes.validaCriarUrl(url);
    let hash = gerador.geraHash(url);
    const result = await global.db.insert(url, hash, utils.getDateNow());
    res.redirect('/');
  } catch (err) {
    res.status(500).send({"message": err.message});
  }
})


/* /* /* /* /* /* /* /* /* /* /* /* /* PAGE URL ENCURTADA /* /* /* /* /* /* /* /* /* /* /* /*
/* GET : Redireciona para URL original*/
router.get('/url/*', async (req, res, next) => {
  try {
    let hash = req.url.substring(5); /*  req.url = "/url/hash"  */
    let encurtador = (await global.db.findOne(hash));
    validacoes.validaRedirect(encurtador[0]);
    global.db.updateAcessos(encurtador[0], utils.getDateNow());
    res.redirect(encurtador[0].original);
    
  } catch (err) {
    console.log(res.body)
    res.status(404).send(err.message);
  }
})


module.exports = router;
