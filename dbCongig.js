const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;

mongoose.connect(`${dbUrl}`);

mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});