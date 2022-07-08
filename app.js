require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const fileApi = require('./app_api/routes/files');
const runApi = require('./app_api/routes/runs');
const usersApi = require('./app_api/routes/users');

var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Sistem za spremljanje in analizo eksperimentov",
      version: "1.0.0",
      description: "Sistem za spremljanje in analizo eksperimentov REST API"
    },
    license: {
      name: "GNU LGPLv3",
      url: "https://choosealicense.com/licenses/lgpl-3.0"
    },
    contact: {
      name: "Tine Črnugelj",
      email: "tc5911@student.uni-lj.si"
    },
    servers: [
      { url: "http://localhost:5000/api" },
    ]
  },
  apis: [
    "./app_api/models/Run.js",
    "./app_api/models/User.js",
  ]
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);

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

runApi.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
runApi.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});


app.listen(5000);
 