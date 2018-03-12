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
        .catch(err => {
            console.error(err);
            response.sendStatus(500);
        });
});

app.post('/todos', (request, response) => {
    const body = request.body;

    client.query(`
        INSERT INTO todos (task, completed)
        VALUES ($1, $2)
        RETURNING id, task, completed;
    `,
    [
        body.task,
        body.completed || false
    ])
        .then(result => response.send(result.rows[0]))
        .catch(err => {
            console.error(err);
            response.sendStatus(500);
        });
});

app.listen(PORT, () => {
    console.log('app server started on port', PORT);
});
