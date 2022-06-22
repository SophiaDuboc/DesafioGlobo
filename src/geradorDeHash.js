var MD5 = require("crypto-js/md5");

const Base62Str = require("base62str").default;
const base62 = Base62Str.createInstance();

function geraHash(urlOriginal){
  let dateNow = Date.now().toString();

  let md5Url = MD5(urlOriginal).toString().substring(0,4);
  let md5DateNow = MD5(dateNow).toString().substring(0,4);

  let hash = base62.encodeStr(md5Url+md5DateNow).substring(0,8);

  return hash;
}

 module.exports = { geraHash }