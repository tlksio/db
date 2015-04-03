var fs = require('fs');
var moment = require('moment');
var rank = require('librank').rank;

// data backup path
var data_path = "./data/talks/";

// read all files in the database
var res = fs.readdirSync(data_path);

// current timestamp
var now = moment();

// calculate difference of hours between two timestamps
function countHours(start, end) {
    var duration = moment.duration(end.diff(start));
    var hours = duration.asHours();
    return hours;
}

// calculate ranking for all elements in the database
res.forEach(function(element) {
    // full fs file path
    var talk_path = data_path + element;
    // get its data
    var talk = require(talk_path);
    // points
    var points = talk.voteCount + 1;
    // hours
    var hours = countHours(talk.created, now);
    // gravity
    var gravity = 1.8;
    // ranking calculation
    var score = rank.rank(points, hours, gravity);
    console.log(score, " - ", talk.title);
});
