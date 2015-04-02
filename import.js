var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var config = require('./config.json');
var data_path = "./data/talks/";

MongoClient.connect(config.mongodb, function(err, db) {
    if (err) {
        throw new Error(err);
    }
    // TODO: Remove old documents, remove collection
    // TODO: Create collection
    var talks = db.collection('talks');
    var files = fs.readdirSync(data_path);
    files.forEach(function(file_path) {
        var talk = require(talk_path);
        console.log("Import : " + talk.title);
    });
    db.close();
});
