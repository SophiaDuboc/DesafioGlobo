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
    let original = encurtaUrl(url)
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
    const result = await global.db.insert({ "original":url, curta:curta, sessao:"" });
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
  let hash = "teste" 
  return "http://localhost:3000/url/" + hash
}





module.exports = router;
