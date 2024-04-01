const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;

mongoose.connect(`${dbUrl}`);