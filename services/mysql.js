const Bluebird = require('bluebird');
const mysql = require('mysql');

// --------------------------------------------------------------------------------------------------

if (process.env.NODE_ENV === 'production') {
    var connection = mysql.createConnection({
        // Setup environment variables for elastic beanstalk
        host: process.env.MYSQL_SERVER,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD
    });
} else if (process.env.NODE_ENV === 'development') {
    // See Navbar-Proxy/config/sqlConfig.example.js for how to setup
    var connection = require('../db/sqlConfig');
}

connection.connect();   // Connect to DB
const db = Bluebird.promisifyAll(connection);   // Promisify all library functions

// --------------------------------------------------------------------------------------------------
const esc = (value, like=false) => {
    return connection.escape((like) ? `%${value}%` : value);
};

const escId = (value) => {
    return connection.escapeId(value)
};

const searchTable = (tblName, column, value, like=false) => {
    let sql = `SELECT * FROM WestBuy.${escId(tblName)} WHERE ${escId(column)} `;
    (like) ? sql += `LIKE ${esc(value, true)};` : sql += `= ${esc(value)};`;
    return db.queryAsync(sql);
};

module.exports = {
    searchTable
};


