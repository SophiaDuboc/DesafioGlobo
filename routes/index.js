var express = require('express');
var router = express.Router();


/* /* /* /* /* /* /* /* /* /* /* /* /* HOME PAGE /* /* /* /* /* /* /* /* /* /* /* /*
/* GET */
router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.render('index', { title: 'Lista de Urls', docs });
  } catch (err) {
    next(err);
  }
})


/* POST */
router.post('/', async (req, res, next) => {
  try {
    const url = req.body.url;
    const result = await global.db.deleteOne(url);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

/* /* /* /* /* /* /* /* /* /* /* /* /* PAGE NEW URL /* /* /* /* /* /* /* /* /* /* /* /*
/* GET */
router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Nova Url' });
});


/* POST */
router.post('/new', async (req, res, next) => {
  try {
    const url = req.body.url;
    let hash = getHash();
    const result = await global.db.insert(url, hash);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})


/* /* /* /* /* /* /* /* /* /* /* /* /* PAGE URL ENCURTADA /* /* /* /* /* /* /* /* /* /* /* /*
/* GET */
router.get('/url/*', async (req, res, next) => {
  try {
    let hash = req.url.substring(5); // req.url = "/url/hash"
    const encurtador = (await global.db.findOne(hash));
    global.db.updateAcessos(encurtador[0]);

    res.redirect(encurtador[0].original);
  } catch (err) {
    next(err);
  }
})


/* /* /* /* /* /* /* /* /* /* /* /* /* GERADOR DE HASH /* /* /* /* /* /* /* /* /* /* /* */
/*TODO: Arrumar imports de outros arquivos para colocar essas funções na pasta src */
function getHash() {
  let tamanhoHash = tamanhoAletorio();
  return geraHashAleatoria(tamanhoHash);
}

function geraHashAleatoria(tamanhoHash) {
  let hash = '';
  let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < tamanhoHash; i++) {
    hash += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return hash;
}

function tamanhoAletorio() {
  const tamanhoMinimoHash = 5;
  const tamanhoMaximoHash = 7;
  return Math.floor(Math.random() * (tamanhoMaximoHash - tamanhoMinimoHash + 1)) + tamanhoMinimoHash;
}

module.exports = router;
