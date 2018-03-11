'use strict';

// Environment variables
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const client = require('./db-client');

app.get('/todos', (request, response) => {
    client.query(`
        SELECT id, task, completed FROM todos;
    `)
        .then(result => response.send(result.rows))
        .catch(console.error);
});

app.listen(PORT, () => {
    console.log('app server started on port', PORT);
});
