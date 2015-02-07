var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var config = require('../front/config.json');

function updateTalk(talk) {
    if (talk.created === undefined) {
        talk.created = Date.now();
    }
    talk.updated = Date.now();

    talk.author.id = "19DF9868-2538-4A51-9263-642129DE57C4";

    return talk;
}

MongoClient.connect(config.mongodb, function (err, db) {
    if (err) { throw new Error(err); }
    var talks = db.collection('talks');
    talks.find({}).toArray(function (err, docs) {
        if (err) { throw new Error(err); }
        docs.forEach(function (talk) {
            console.log("Updated talk "+talk.id);
            talk = updateTalk(talk);
            talks.update({id: talk.id}, talk, function (error) {
                if (err) { throw new Error(err); }
                db.close();
            });
        });
    });
});
