const sql = require('mssql/msnodesqlv8');
const config = require('../config/db/index');

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
