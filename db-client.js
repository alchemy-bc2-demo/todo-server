'use strict';

require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

const pg = require('pg');
const Client = pg.Client;
const client = new Client(DATABASE_URL);

client.connect();
client.on('error', console.error);

module.exports = client;