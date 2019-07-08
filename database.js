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
        if (email.includes('@')) {
            newQuery = 'SELECT * FROM User_Details WHERE Email_Id=' + mysql.escape(email) + 'AND Password=' + mysql.escape(password) + 'AND User_type_' + user_type + '= 1';
        } else {
            newQuery = 'SELECT * FROM User_Details WHERE Username=' + mysql.escape(email) + 'AND Password=' + mysql.escape(password) + 'AND User_type_' + user_type + '= 1';

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

function addUser(body) {
    return new Promise((resolve, reject) => {
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

        let updateQuery = "INSERT INTO User_Details (Email_Id, Password, Username, First_Name, Last_Name, Phone_Number, User_type_" + user_type + ", country, city, accountnumber) VALUES (" + mysql.escape(email) + ',' + mysql.escape(password) + ',' + mysql.escape(username) + ',' + mysql.escape(firstname) + ',' + mysql.escape(lastname) + ',' + mysql.escape(phonenumber) + ',' + '1' + ',' + mysql.escape(countrytext) + ',' + mysql.escape(city) + ',' + mysql.escape(accountnumber) + ')';
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
        let user_type = body.user_type;

        let newQuery;
        if (email.includes('@')) {
            newQuery = 'SELECT * FROM User_Details WHERE Email_Id=' + mysql.escape(email) + 'AND User_type_' + user_type + '= 1';
        } else {
            newQuery = 'SELECT * FROM User_Details WHERE Username=' + mysql.escape(email) + 'AND User_type_' + user_type + '= 1';
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

function updateTable (body) {
    return new Promise((resolve, reject) => {
 
        let Client_like =  body.Client_like;
        let User_name  = body.User_name;
        let job_id = body.job_id;
        let Freelancer_like = body.Freelancer_like;

        let newQuery;
        if(Freelancer_like == undefined) {
            newQuery = "INSERT INTO Match_Table (job_id, Client_like, User_name) VALUES ("+ mysql.escape(job_id) +"," + mysql.escape(Client_like) + "," + mysql.escape(User_name) + ") ON DUPLICATE KEY UPDATE job_id = "+mysql.escape(job_id) +", Client_like = " + mysql.escape(Client_like) +",User_name =" + mysql.escape(User_name);
        } else if (Client_like == undefined) {
            newQuery = "INSERT INTO Match_Table (job_id, Freelancer_like, User_name) VALUES ("+ mysql.escape(job_id) +"," + mysql.escape(Freelancer_like) + "," + mysql.escape(User_name) + ") ON DUPLICATE KEY UPDATE job_id = "+mysql.escape(job_id) +" ,Freelancer_like = " + mysql.escape(Freelancer_like) +",User_name =" + mysql.escape(User_name);

        }
        connection.query(newQuery, function (error, userprofile, fields) {
            console.log(userprofile);
            console.log('inside the the query');
            if (error)
                throw error;
            resolve({userprofile})
        })
    })
}

function checkMatch(job_id) {
    return new Promise((resolve, reject) => {
        let newQuery = 'SELECT * FROM Match_Table WHERE job_id=' + mysql.escape(job_id);

        connection.query(newQuery, function (error, userprofile, fields) {
            console.log(userprofile[0]);
            if (error)
                throw error;
                if(userprofile[0].Client_like == 1 && userprofile[0].Freelancer_like == 1) {
                    let query = "UPDATE Match_Table SET Match_Status = '1' WHERE job_id = " + mysql.escape(job_id);
                    connection.query(newQuery, function (error, userprofile, fields) {
                        console.log(userprofile);
                        console.log('inside the the query');
                        if (error)
                            throw error;
                        resolve({userprofile})
                    })   
                }
        })

 
    })
}

function getUsernamesAndEmails() {
    return new Promise((resolve, reject) => {
        let newQuery = 'SELECT Email_Id, Username FROM User_Details';

        connection.query(newQuery, function (error, userprofile, fields) {
            console.log(userprofile[0]);
            if (error)
                throw error;
                resolve(userprofile)
        })

 
    })
}
module.exports.checkLogin = checkLogin;
module.exports.addUser = addUser;
module.exports.findUser = findUser;
module.exports.updateTable = updateTable;
module.exports.checkMatch = checkMatch;
module.exports.getUsernamesAndEmails = getUsernamesAndEmails;