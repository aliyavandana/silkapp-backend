// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: '127.0.0.1',
//     port: '3306',
//     database: 'silkapp',
//     user: 'root',
//     password: '[your_new_pwd]',
//     multipleStatements: true,
// });

// let newQuery = 'SELECT * FROM userdetails'; // WHERE Email_Id=' + mysql.escape(email) + 'AND Password=' + mysql.escape(password);
// connection.query(newQuery, function (error, userprofile, fields) {
//     console.log(userprofile);
//     console.log(fields)
//     console.log('inside the the query');
//     if (error)
//         throw error;
// })
var database = require('./database')
var mongodatabase = require('./mongodatabase')

// let req = {
//     body : {
//         "email": "aliyaboni123@gmail.com",
//         "firstname": "aliya",
//         "lastname": "boni",
//         "password": "aliya123",
//         "phonenumber": "8448637285",
//         "username": "aliyaboni",
//         "user_type" : 'freelancer'
//     }
// }
// database.addUser(req.body)
//     .then(result =>{
//         if(result) {
//             res.send({status : "Success"});
//         } else {
//             res.send({status : "Failed"});
//         }
//     })

let body = {
    user_id : "Aliya",

}

// database.checkLogin(body).then(result => {
//     console.log(result)
// })

mongodatabase.getJob(body)
.then(JobId =>{
    // res.send({'jobid' : JobId});
    console.log(JobId)
})