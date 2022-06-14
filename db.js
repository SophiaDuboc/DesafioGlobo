const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb+srv://admin:admin@encurtadorurl.iu8f1.mongodb.net/?retryWrites=true&w=majority")
            .then(conn => global.conn = conn.db("encurtador"))
            .catch(err => console.log(err));

const collectionName = "urls";

function findAll() {
    return global.conn.collection(collectionName).find().toArray();
}

function insert(urlOriginal, hash) {
    return global.conn.collection(collectionName).insertOne({ "original":urlOriginal, "hash":hash, "acessos": 0});
}

function findOne(filter){
    let search = defineSearch(filter);
    return (global.conn.collection(collectionName).find(search).toArray());
}

function updateAcessos(encurtador){
    let qtdAcessos = encurtador.acessos + 1;
    return global.conn.collection(collectionName).updateOne({"original": encurtador.original}, {$set:{"acessos": qtdAcessos}});
}

function deleteOne(filter){
    let search = defineSearch(filter);
    return global.conn.collection(collectionName).deleteOne(search);
}

/* /* /* /* /* /* /* /* /* /* /* /* /* FUNÇÕES AUXILIARES /* /* /* /* /* /* /* /* /* /* /* */
function defineSearch(filter){
    if(filter.includes("http")){
        var search = {"original": filter } 
    }else{
        var search = {"hash": filter }
    }
    return search;
}


module.exports = { findAll , insert , findOne , updateAcessos , deleteOne}