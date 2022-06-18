
const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://127.0.0.1:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000")
            .then(conn => global.conn = conn.db("encurtador"))
            .catch(err => console.log(err));

let utils = require("./src/utils");

const collectionName = "urls";

function findAll() {
    return global.conn.collection(collectionName).find().toArray();
}

function insert(url, hash, dataCriacao) {
    return global.conn.collection(collectionName)
    .insertOne({
            "original": url,
            "hash": hash,
            "acessos": 0,
            "data_cricao,": dataCriacao,
            "ultimo_acesso": ""
        });
}

function findOne(filter){
    let search = defineSearch(filter);
    return (global.conn.collection(collectionName).find(search).toArray());
}

function updateAcessos(encurtador, date){
    let qtdAcessos = encurtador.acessos + 1;
    return global.conn.collection(collectionName)
    .updateOne({
        "original": encurtador.original},
        {$set:{
            "acessos": qtdAcessos,
            "ultimo_acesso": date
        }
    });
}

function deleteOne(filter){
    let search = defineSearch(filter);
    return global.conn.collection(collectionName).deleteOne(search);
}

/* /* /* /* /* /* /* /* /* /* /* /* /* FUNÇÃO AUXILIAR /* /* /* /* /* /* /* /* /* /* /* */
function defineSearch(filter){
    if(utils.isUrl(filter)){
        var search = {"original": filter };
    }else{
        var search = {"hash": filter };
    }
    return search;
}


module.exports = { findAll , insert , findOne , updateAcessos , deleteOne }