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

/* GET page new Url. */
router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Nova Url' });
});


/* POST new Url. */
router.post('/new', async (req, res, next) => {
  const url = req.body.url;
 
  try {
    const result = await global.db.insert({ "original":url, curta:"", sessao:"" });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})


module.exports = router;
