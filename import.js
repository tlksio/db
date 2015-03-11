var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var config = require('../front/config.json');

MongoClient.connect(config.mongodb, function (err, db) {
    if (err) {
        throw new Error(err);
    }
    var talks = db.collection('talks');
    db.close();
});
