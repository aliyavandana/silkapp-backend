// var MongoClient = require('mongodb').MongoClient;

// // Connect to the db
// MongoClient.connect("mongodb://localhost:27017/silkAppDatabase", function (err, db) {

//     db.collection('freelancer', function (err, collection) {

//          collection.find().toArray(function(err, items) {
//             if(err) throw err;    
//             console.log(items);            
//         });

//     });

// });


var mongoClient = require("mongodb").MongoClient;

var server = "mongodb://localhost:27017/silkAppDatabase";

mongoClient.connect(server, function (error, db) {
    if (error)
        console.log("Error while connecting to database: ", error);
    else
        console.log("Connection established successfully");
    
        var freelancer = db.collection('freelancer');

    var filter = {};

    freelancer.find(filter).toArray(function (error, documents) {
        if (error)
            console.log("Error: ", error);
        else {
            documents.forEach(function (doc) {
                console.log(doc);
            });
        }
    });
    //perform operations here

    db.close();
});