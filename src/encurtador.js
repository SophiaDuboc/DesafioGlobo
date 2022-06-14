/*TODO: Arrumar imports de outros arquivos para poder importar e usar esta classe */
class Encurtador{

    constructor(obj){
        this.original = obj.original;
        this.hash = obj.hash;
        this.acessos = obj.acessos;
    }

    getOriginal(){
        return this.original;
    }

    getHash(){
        return this.hash;
    }

    getAcessos(){
        return this.acessos;
    }
}