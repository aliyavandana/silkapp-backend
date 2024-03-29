var express = require('express');
var database = require('./database');
var mongodatabase = require('./mongodatabase');
const app = express();
const port = 3000;


var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("App Api")
})

app.post('/loginCredentials',(req, res) => {
    console.log('body is : ', req.body);
    database.checkLogin(req.body)
    .then(result => {
        console.log(result);
        if(result) {
            res.send({status : "Success"});
        } else {
            res.send({status: "Failed"})
        }
    })
})

app.post('/signupCredentials',(req, res) => {
    console.log("body is  : ",  req.body);
    database.addUser(req.body)
    .then(result =>{
        if(result) {
            res.send({status : "Success"});
        } else {
            res.send({status : "Failed"});
        }
    })
})

app.post('/mongoFreelancer',(req, res) => {
    console.log("body is  : ",  req.body);
    mongodatabase.addUserData(req.body)
    .then(result =>{
        if(result) {
            res.send({status : "Success"});
        } else {
            res.send({status : "Failed"});
        }
    })
})

app.post('/mongoClientJob',(req, res) => {
    console.log("body is  : ",  req.body);
    mongodatabase.addJob(req.body)
    .then(result =>{
        if(result) {
            res.send({status : "Success"});
        } else {
            res.send({status : "Failed"});
        }
    })
})

app.get('/allFreelancers',(req, res) => {
    // console.log("body is  : ",  req.body);
    mongodatabase.getFreelancers(req.body)
    .then(freelancersArray =>{
        // if(result) {
        //     res.send({status : "Success"});
        // } else {
        //     res.send({status : "Failed"});
        // }
        res.send({'data' : freelancersArray});
    })
})

app.get('/allJobs',(req, res) => {
    // console.log("body is  : ",  req.body);
    mongodatabase.getAllJobs(req.body)
    .then(jobsArray =>{
        res.send({'data' : jobsArray});
    })
})

app.post('/userDetails',(req, res) => {
    // console.log("body is  : ",  req.body);
    database.findUser(req.body)
    .then(result =>{
        if(result) {
            res.send(result);
        } else {
            res.send(result);
        }
    })
})

app.post('/getJobId',(req, res) => {

    mongodatabase.getJob(req.body)
    .then(JobId =>{
        res.send({'jobid' : JobId});
    })
})

app.post('/updateMatchTable',(req, res) => {
    // console.log("body is  : ",  req.body);
    database.updateTable(req.body)
    .then(result =>{
        database.checkMatch(req.body.job_id).then(response => {
            res.send(response)
        })
        // if(result) {
        //     res.send(result);
        // } else {
        //     res.send(result);
        // }
    })
})

app.get('/getUsernamesAndEmails', (req, res) => {
    database.getUsernamesAndEmails().then(response => {
        res.send(response);
    })
})

// allJobs

// app.post('/getData', function (req, res) {
// 	console.log('receiving data ...');
// 	console.log('body is ', req.body);

// 	database.getDatabaseData()
// 		.then(dataRecieved => {
// 			res.send(dataRecieved);
// 		})
// });

// app.post('/packing-update',(req,res) => {
// 	console.log('body is :', req.body);
// 	console.log(req.body);

// 	packing.updateData(req.body)
// 		.then(data => {
// 			console.log(data);
// 			if(data == 1)
// 			res.send({status: "Success"});
// 		})
// });

// app.post('/assembly-update',(req, res) => {
// 	console.log('body is :', req.body);
// 	console.log(req.body);

// 	assembly.updateData(req.body)
// 		.then(data => {
// 			console.log(data);
// 			if(data == 1)
// 			res.send({status: "Success"});
// 		})
// })

app.listen(port, () => { console.log("App is running on port 3000") });