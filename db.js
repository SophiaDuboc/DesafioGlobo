const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb+srv://admin:admin@encurtadorurl.iu8f1.mongodb.net/?retryWrites=true&w=majority")
            .then(conn => global.conn = conn.db("encurtador"))
            .catch(err => console.log(err));

function findAll() {
    return global.conn.collection("urls").find().toArray();
}

function insert(urlOriginal, hash) {
    return global.conn.collection("urls").insertOne({ "original":urlOriginal, "hash":hash, "acessos": 0});
}

function findOne(find){
    let search = getSearch(find);
    return (global.conn.collection("urls").find(search).toArray());
}

function updateAcessos(encurtador){
    qtdAcessos = encurtador.acessos + 1;
    return global.conn.collection("urls").updateOne({"original": encurtador.original}, {$set:{"acessos": qtdAcessos}});
}

function deleteOne(find){
    let search = getSearch(find);
    global.conn.collection("urls").deleteOne(search);
}

/* /* /* /* /* /* /* /* /* /* /* /* /* FUNÇÕES AUXILIARES /* /* /* /* /* /* /* /* /* /* /* */
function getSearch(find){
    if(find.includes("http")){
        var search = {"original": find } 
    }else{
        var search = {"hash": find }
    }
    return search;
}


module.exports = { findAll , insert , findOne , updateAcessos , deleteOne}