
let utils = require("../src/utils");

async function validaExclusao(url){
    const encurtador = (await global.db.findOne(url));
    if(isUndefined(encurtador[0])){
      throw {"message": "Não existe URL para exclusão"};
    }
  }
  
  async function validaCriarUrl(url){
    validaUrl(url);
    await validaUrlExistente(url);
  }
  
  async function validaUrlExistente(url){
    const encurtador = (await global.db.findOne(url));
    if(isNotUndefined(encurtador[0])){
      throw {"message": "Url já existe"};
    }
  }

  function validaUrl(url) {
    let isUrl = utils.isUrl(url);
    if (!isUrl){
      throw {"message": "URL não é válida"};
    }
  }

  function validaRedirect(encurtador) {
    if(isUndefined(encurtador)){
      throw {"message": "URL não existe"};
    }
  }

  function isUndefined(x){
    return (x == undefined);
  }

  function isNotUndefined(x){
    return !isUndefined(x); 
  }

module.exports = { validaExclusao , validaCriarUrl , validaUrl , validaRedirect }