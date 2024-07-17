const sql = require('mssql/msnodesqlv8');
const config = {
    server: '21AK22-COM\\DAYLASQL',
    database: 'FB',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
    },
};
sql.connect(config, (err) => {
    if (err) console.log(err);
    else console.log('Connected to SQL Server');
});
module.exports = sql;
