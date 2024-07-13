const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const route = require('./routes/index');
const cors = require('cors');

//
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
//
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Thêm dòng này để parse JSON bodies
route(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
