// config/dbConfig.js
const config = {
    server: 'DESKTOP-TMPNLFQ\\NAM', // Địa chỉ hoặc tên máy chủ SQL Server
    database: 'FB', // Tên cơ sở dữ liệu
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true, // Sử dụng Windows Authentication
    },
};

module.exports = config;
