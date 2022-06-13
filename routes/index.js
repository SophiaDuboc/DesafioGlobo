var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.render('index', { title: 'Lista de Urls', docs });
  } catch (err) {
    next(err);
  }
})


/* POST home page. */
router.post('/', async (req, res, next) => {
  const url = req.body.url;
  try {
    const result = await global.db.deleteOne(url);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})


/* GET page new Url. */
router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Nova Url' });
});


/* POST new Url. */
router.post('/new', async (req, res, next) => {
  const url = req.body.url;
 
  try {
    let curta = encurtaUrl(url)
    const result = await global.db.insert(url, curta);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})


/* GET url encurtada. */
router.get('/url/*', async (req, res, next) => {
  try {
    const baseUrl = "http://localhost:3000"
    const encurtador = (await global.db.findOne(baseUrl + req.url));
    global.db.updateAcessos(encurtador[0]);

    res.redirect(encurtador[0].original);
    
  } catch (err) {
    next(err);
  }
})

function encurtaUrl(url) {
  let hash = geraHashAleatoria()
  return "http://localhost:3000/url/" + hash
}

function geraHashAleatoria() {
  let hash = '';
  let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let tamanhoHash = tamanhoRandom();
  for (var i = 0; i < tamanhoHash; i++) {
    hash += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return hash;
}

function tamanhoRandom() {
  const min = 5;
  const max = 7;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;
