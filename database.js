var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    database: 'silkapp',
    user: 'root',
    password: '[your_new_pwd]',
    multipleStatements: true,
});

function checkLogin(body) {
    // console.log(connection);
    return new Promise((resolve, reject) => {
        let email = body.email;
        let password = body.password;
        console.log("just before query");
         let newQuery = 'SELECT * FROM userdetails WHERE Email_Id=' + mysql.escape(email) + 'AND Password=' + mysql.escape(password);
        connection.query(newQuery, function (error, userprofile, fields) {
            console.log(userprofile);
            // console.log(fields)
            console.log('inside the the query');
            if (error)
                throw error;
            if (userprofile.length === 1) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}

function addUser(body){
    return new Promise((resolve,reject) => {
        let email = body.email;
        let password = body.password;
        let username = body.username;
        let firstname = body.firstname;
        let lastname = body.lastname;
        let phonenumber = body.phonenumber;
        let updateQuery =  "INSERT INTO userdetails (Email_Id, Password, Username, FirstName, LastName, PhoneNumber) VALUES (" + mysql.escape(email) +',' + mysql.escape(password) + ',' + mysql.escape(username) +','+ mysql.escape(firstname) +',' + mysql.escape(lastname) +','+ mysql.escape(phonenumber) + ')';
        connection.query(updateQuery, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            console.log(result);
            resolve(true);
          });
    
    })
}

module.exports.checkLogin = checkLogin;
module.exports.addUser = addUser;