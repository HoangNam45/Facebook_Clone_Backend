const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const route = require('./routes/index');
const cors = require('cors');
// const { connectToDatabase } = require('./db/database');

//
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
//connect to database
// connectToDatabase();
const sql = require('mssql');

// Cấu hình kết nối cơ sở dữ liệu
const config = {
    server: 'DESKTOP-TMPNLFQ\\NAM', // Tên máy chủ SQL Server của bạn
    database: 'FB', // Tên cơ sở dữ liệu
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true, // Sử dụng Windows Authentication
    },
};

// Hàm kết nối tới cơ sở dữ liệu
async function connectToDatabase() {
    try {
        console.log('Trying to connect to SQL Server...');
        const pool = await sql.connect(config);
        console.log('Connected to SQL Server');
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

// Sử dụng hàm kết nối
connectToDatabase()
    .then((pool) => {
        // Thực hiện truy vấn hoặc các thao tác khác với cơ sở dữ liệu
        return pool.request().query('SELECT * FROM Users');
    })
    .then((result) => {
        console.log('Query result:', result.recordset);
    })
    .catch((err) => {
        console.error('Query error:', err);
    });

connectToDatabase();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Thêm dòng này để parse JSON bodies
route(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
