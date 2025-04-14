require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const cors = require('cors');

const app = express();
const port = 3000;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

app.use(express.json());
app.use(cors());

//Start the Server
app.listen(port, () => {    
    console.log(`Server started on http://localhost:${port}`);
});

const routes = require('./routes/routes');

app.use('/',routes);