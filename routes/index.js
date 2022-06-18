var MD5 = require("crypto-js/md5");
const Base62Str = require("base62str").default;
const base62 = Base62Str.createInstance();


var express = require('express');
var router = express.Router();


/* /* /* /* /* /* /* /* /* /* /* /* /* HOME PAGE /* /* /* /* /* /* /* /* /* /* /* /*
/* GET : Listar URLs*/
router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.render('index', { title: 'Lista de Urls', docs });
  } catch (err) {
    next(err);
  }
})


/* POST : Deletar URL*/
router.post('/', async (req, res, next) => {
  try {
    const url = req.body.url;
    await validaExclusao(url);
    const result = await global.db.deleteOne(url);
    console.log(result);
    res.redirect('/');
    return;
    
  } catch (err) {
    next(err);
  }
})

/* /* /* /* /* /* /* /* /* /* /* /* /* PAGE NEW URL /* /* /* /* /* /* /* /* /* /* /* /*
/* GET : mostra form para criar nova URL*/
router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Nova Url' });
});


/* POST : cria nova URL */
router.post('/new', async (req, res, next) => {
  try {
    const url = req.body.url;
    await validaCriarUrl(url);
    let hash = geraHash(url);
    const result = await global.db.insert(url, hash);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})


/* /* /* /* /* /* /* /* /* /* /* /* /* PAGE URL ENCURTADA /* /* /* /* /* /* /* /* /* /* /* /*
/* GET : Redireciona para URL original*/
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

function geraHash(urlOriginal){
  let hashUrl = geraHashUrl(urlOriginal);
  let hashDate = geraHashDateNow(Date.now());

  let hash = hashUrl + hashDate;
  return hash;
}

function geraHashUrl(urlOriginal){
  let md5Url = MD5(urlOriginal).toString().substring(0,4);
  let url62 = base62.encodeStr(md5Url).substring(0,4);
  return url62;
}

function geraHashDateNow(date){
  let md5DateNow = MD5(Date.now()).toString().substring(0,4);
  let dateNow62 = base62.encodeStr(md5DateNow).substring(0,4);
  return dateNow62;
}


/* /* /* /* /* /* /* /* /* /* /* /* /* VALIDAÇÕES /* /* /* /* /* /* /* /* /* /* /* */
/*TODO: Arrumar imports de outros arquivos para colocar essas funções na pasta src */

async function validaExclusao(url){
  const encurtador = (await global.db.findOne(url));
  if(encurtador.length == 0){
    throw {"message": "Não existe URL para exclusão"};
  }
}

async function validaCriarUrl(url){
  validaUrl(url);
  await validaUrlExistente(url);
}

async function validaUrlExistente(url){
  const encurtador = (await global.db.findOne(url));
  if(encurtador.length > 0){
    throw {"message": "Url já existe"};
  }
}

function validaUrl(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if (res == null){
    throw {"message": "URL não é válida"};
  }
}

module.exports = router;
