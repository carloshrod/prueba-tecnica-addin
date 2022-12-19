const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv").config();
const { router } = require('./routes/index.routes');
const { connectToDB } = require('./database');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

//Middlewares:
app.use(morgan("dev"))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router:
app.use(router)

// Errors middleware:
app.use(errorHandler)

// Connect to database:
connectToDB();

// Start server:
const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`************ SERVER LISTENING ON PORT ${PORT} ************\n`);
})
