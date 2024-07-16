// db/database.js
const sql = require('mssql');
const config = require('../config/db');

async function connectToDatabase() {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to SQL Server');
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

module.exports = {
    connectToDatabase,
    sql,
};
