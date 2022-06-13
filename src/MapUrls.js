export class MapUrls {
    constructor(obj) {
      this.original = obj[0].original;
      this.curta = obj[0].curta;
      this.sessao = obj[0].sessao;
    }

    getOriginal(){
        return this.original;
    }

    getCurta(){
        return this.curta;
    }

    getSessao(){
        return this.sessao
    }

}