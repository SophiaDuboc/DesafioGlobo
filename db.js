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
 
module.exports = { findAll , insert}