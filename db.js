const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb+srv://admin:admin@encurtadorurl.iu8f1.mongodb.net/?retryWrites=true&w=majority")
            .then(conn => global.conn = conn.db("encurtador"))
            .catch(err => console.log(err))

function findAll() {
    return global.conn.collection("urls").find().toArray();
}

function insert(url) {
    return global.conn.collection("urls").insertOne(url);
}

function findOne(url){
    let search = getSearch(url);
    return (global.conn.collection("urls").find(search).toArray());
}

function updateAcessos(encurtador){
    qtdAcessos = encurtador.acessos + 1
    return global.conn.collection("urls").update({"original": encurtador.original}, {$set:{"acessos": qtdAcessos}})
}

function deleteOne(url){
    global.conn.collection("urls").deleteOne({"original": url })
}

function getSearch(url){
    if(url.includes("localhost")){
        var search = {"curta": url } 
    }else{
        var search = {"original": url }
    }
    return search;
}

module.exports = { findAll , insert , findOne , updateAcessos , deleteOne}