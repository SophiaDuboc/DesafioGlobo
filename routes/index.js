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
    let hash = await getHash();
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
async function getHash() {
  let tamanhoHash = tamanhoAletorio();
  let hash = await geraHashAleatoria(tamanhoHash);
  return hash;
}

async function geraHashAleatoria(tamanhoHash) {
  let numTentativa = 0;
  do{
    if (numTentativa > 5){
      throw {"message": "Hash não gerada. Número de tentativas excedido. Tente novamente"};
    }
    numTentativa += 1;
    var hash = await geraHash(tamanhoHash);
  } while(await hashJaExiste(hash));

  return hash;
}

async function geraHash(tamanhoHash){
  let hash = '';
  let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < tamanhoHash; i++) {
    hash += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return hash

}

async function hashJaExiste(hash){
  const encurtador = (await global.db.findOne(hash));
  if(encurtador.length > 0){
    return true;
  }
  return false;
}

function tamanhoAletorio() {
  const tamanhoMinimoHash = 5;
  const tamanhoMaximoHash = 7;
  return Math.floor(Math.random() * (tamanhoMaximoHash - tamanhoMinimoHash + 1)) + tamanhoMinimoHash;
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
