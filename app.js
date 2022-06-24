require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const fileApi = require('./app_api/routes/files');
const runApi = require('./app_api/routes/runs');
const usersApi = require('./app_api/routes/users');

require('./app_api/models/db');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

app.use('/api', fileApi);
app.use('/api', runApi);
app.use('/api', usersApi);


app.listen(3000);
 