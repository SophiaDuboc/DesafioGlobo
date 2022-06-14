/*TODO: Arrumar imports de outros arquivos para poder importar e usar estas funções */

 function geraHash() {
    let tamanhoHash = tamanhoAletorio();
    return geraHashAleatoria(tamanhoHash)
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
    const tamanhoMinimoHash = 5
    const tamanhoMaximoHash = 7
    return Math.floor(Math.random() * (tamanhoMaximoHash - tamanhoMinimoHash + 1)) + tamanhoMinimoHash;
  }
