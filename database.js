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
        let user_type = body.user_type;
        console.log("just before query");
        let newQuery;
        if(email.includes('@')) {
         newQuery = 'SELECT * FROM User_Details WHERE Email_Id=' + mysql.escape(email) + 'AND Password=' + mysql.escape(password) + 'AND User_type_' + user_type +'= 1';
        } else {
            newQuery = 'SELECT * FROM User_Details WHERE Username=' + mysql.escape(email) + 'AND Password=' + mysql.escape(password) + 'AND User_type_' + user_type +'= 1';

        }
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
        let countrytext = body.countrytext;
        let city = body.city;
        let accountnumber = body.accountnumber;
        let user_type = body.user_type;
        
        let updateQuery =  "INSERT INTO User_Details (Email_Id, Password, Username, First_Name, Last_Name, Phone_Number, User_type_" + user_type +", country, city, accountnumber) VALUES (" + mysql.escape(email) +',' + mysql.escape(password) + ',' + mysql.escape(username) +','+ mysql.escape(firstname) +',' + mysql.escape(lastname) +','+ mysql.escape(phonenumber) + ',' + '1' +','+ mysql.escape(countrytext) + ',' + mysql.escape(city) + ',' + mysql.escape(accountnumber) + ')';
        console.log(updateQuery)
        connection.query(updateQuery, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            console.log(result);
            resolve(true);
          });
    
    })
}

function findUser(body) {
    // console.log(connection);
    return new Promise((resolve, reject) => {
        let email = body.email;
        let newQuery;
        if(email.includes('@')) {
         newQuery = 'SELECT * FROM User_Details WHERE Email_Id=' + mysql.escape(email) + 'AND Password=' + mysql.escape(password) + 'AND User_type_' + user_type +'= 1';
        } else {
            newQuery = 'SELECT * FROM User_Details WHERE Username=' + mysql.escape(email) + 'AND Password=' + mysql.escape(password) + 'AND User_type_' + user_type +'= 1';
        }

        connection.query(newQuery, function (error, userprofile, fields) {
            console.log(userprofile);
            // console.log(fields)
            console.log('inside the the query');
            if (error)
                throw error;
            // if (userprofile.length === 1) {
            //     resolve(true);
            // } else {
            //     resolve(false);
            // }
            resolve(userprofile)
        })
    })
}

module.exports.checkLogin = checkLogin;
module.exports.addUser = addUser;
module.exports.findUser = findUser;