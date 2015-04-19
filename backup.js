var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var config = require('./config.json');

MongoClient.connect(config.mongodb, function(err, db) {
    if (err) { 
        throw new Error(err);
    }
    var talks = db.collection('talks');
    talks.find({}).toArray(function(err, docs) {
        if (err) {
            throw new Error(err);
        }
        docs.forEach(function(el) {
            var outputFilename = "./data/talks/" + el.id + ".json";
            fs.writeFile(outputFilename, JSON.stringify(el, null, 4), function(err) {
                if (err) {
                    throw new Error(err);
                }
            });
        });
        db.close();
    });
});
