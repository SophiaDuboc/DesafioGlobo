var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.render('index', { title: 'Lista de Clientes', docs });
  } catch (err) {
    next(err);
  }
})

module.exports = router;
