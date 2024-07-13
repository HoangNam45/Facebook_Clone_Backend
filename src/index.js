const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const route = require('./routes/index');

app.use(express.urlencoded({ extended: true }));
route(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
