var mongoClient = require("mongodb").MongoClient;

var server = "mongodb://localhost:27017/silkAppDatabase";

function addUserData(body) {
    return new Promise((resolve, reject) => {


        mongoClient.connect(server, function (error, db) {
            if (error)
                console.log("Error while connecting to database: ", error);
            else
                console.log("Connection established successfully");

            var freelancer = db.collection('freelancer');

            freelancer.insertOne(body, function (err, res) {
                if (err) {
                    resolve(false)
                } else {
                    console.log("1 record inserted");
                    resolve(true)
                }

                db.close();
            });
        })
    })
}

function addJob(body) {
    return new Promise((resolve, reject) => {


        mongoClient.connect(server, function (error, db) {
            if (error)
                console.log("Error while connecting to database: ", error);
            else
                console.log("Connection established successfully");

            var jobs = db.collection('jobs_created');

            jobs.insertOne(body, function (err, res) {
                if (err) {
                    resolve(false)
                } else {
                    console.log("1 record inserted");
                    resolve(true)
                }

                db.close();
            });
        })
    })
}


function getFreelancers() {
    return new Promise((resolve, reject) => {

        
        mongoClient.connect(server, function (error, db) {
            if (error)
                console.log("Error while connecting to database: ", error);
            else
                console.log("Connection established successfully");

            var freelancer = db.collection('freelancer');

            var filter = {};

            let allfreelancers = [];
            freelancer.find(filter).toArray(function (error, documents) {
                if (error)
                    console.log("Error: ", error);
                else {
                    documents.forEach(function (doc) {
                        allfreelancers.push(doc)
                        console.log(doc);
                    });
                }
            });

            resolve(allfreelancers);
            //perform operations here

            db.close();
        });
    })
}

module.exports.addUserData = addUserData;
module.exports.addJob = addJob;
module.exports.getFreelancers = getFreelancers;