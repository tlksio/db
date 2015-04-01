var fs = require('fs');
var slug = require('slug');
var MongoClient = require('mongodb').MongoClient;

var config = require('../front/config.json');

function updateTalk(talk) {
    if (talk.created === undefined) {
        talk.created = Date.now();
    }
    //talk.updated = Date.now();
    return talk;
}

MongoClient.connect(config.mongodb, function (err, db) {
    if (err) { 
        throw new Error(err);
    }
    var talks = db.collection('talks');
    talks.find({}).toArray(function (err, docs) {
        if (err) {
            throw new Error(err);
        }
        docs.forEach(function (talk) {
            var talk = updateTalk(talk);
            talks.update({id: talk.id}, talk, function (error) {
                if (err) {
                    throw new Error(err);
                }
                console.log("Updated talk "+talk.id);
                db.close();
            });
        });
    });
});
