var express = require('express');
var router = express.Router();

let gerador = require("../src/geradorDeHash")
let utils = require("../src/utils")
let validacoes = require("../src/validacoes")

const cors = require('cors')


router.use(cors())

/* GET : Listar URLs*/
router.get('/', async function(req, res, next) {
  try {
    const allUrls = await global.db.findAll();
    res.send(allUrls);
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
    return result
  } catch (err) {
    res.status(500).send({"message": err.message});
  }
})

/* POST : cria nova URL */
router.post('/new', async (req, res, next) => {
  try {
    const url = req.body.url;
    await validacoes.validaCriarUrl(url);
    let hash = gerador.geraHash(url);
    const result = await global.db.insert(url, hash, utils.getDateNow());
    res.send(result);

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
