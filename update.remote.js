var fs = require('fs');
var slug = require('slug');
var MongoClient = require('mongodb').MongoClient;

var config = require('../front/config.json');

function updateTalk(talk) {
    if (talk.created === undefined) {
        talk.created = Date.now();
    }
    if (talk.voteCount===0) {
        talk.votes.push(talk.author.id);
        talk.voteCount++;
        talk.updated = Date.now();
    }
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
            talk = updateTalk(talk);
            talks.update({
                "id": talk.id
            }, {
                $set: {
                    "updated": talk.updated,
                    "votes": talk.votes,
                    "voteCount": talk.voteCount
                }
            }, function (error) {
                if (err) {
                    throw new Error(err);
                }
                db.close();
            });
        });
    });
});
