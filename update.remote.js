var fs = require('fs');
var slug = require('slug');
var MongoClient = require('mongodb').MongoClient;

var config = require('./config.json');

function updateTalk(talk) {

    if (talk.type === undefined) {
        talk.type = "youtube";
    }

    if (talk.created === undefined) {
        talk.created = Date.now();
    }

    return talk;
}

<<<<<<< HEAD
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

MongoClient.connect(config.mongodb, function (err, db) {
=======
MongoClient.connect(config.mongodb, function(err, db) {
>>>>>>> 4f08548bc1912999c9776ac5c6ea223d0d5285c9
    if (err) { 
        throw new Error(err);
    }
    var talks = db.collection('talks');
    talks.find({}).toArray(function(err, docs) {
        if (err) {
            throw new Error(err);
        }
        docs.forEach(function(talk) {
            talk = updateTalk(talk);
<<<<<<< HEAD
            var pre = talk.tags;
            talk.tags = uniq(talk.tags);
            if (pre.length!=talk.tags.length) {
                console.log(talk.tags.toString());
                talks.update({
                    "id": talk.id
                }, talk, function (error) {
                    if (err) {
                        throw new Error(err);
                    }
                    db.close();
                });
            }
=======
            talks.update({
                "id": talk.id
            }, talk, function(error) {
                if (err) {
                    throw new Error(err);
                }
                db.close();
            });
>>>>>>> 4f08548bc1912999c9776ac5c6ea223d0d5285c9
        });
    });
});
