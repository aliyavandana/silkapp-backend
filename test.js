var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    database: 'mydatabase',
    user: 'root',
    password: 'silktechnologies',
    multipleStatements: true,
});

let newQuery = 'SELECT * FROM userdetails'; // WHERE Email_Id=' + mysql.escape(email) + 'AND Password=' + mysql.escape(password);
connection.query(newQuery, function (error, userprofile, fields) {
    console.log(userprofile);
    console.log(fields)
    console.log('inside the the query');
    if (error)
        throw error;
})