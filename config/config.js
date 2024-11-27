require('dotenv').config();
const { accessSecret } = require('../helpers/secretHelpers');

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'destinasyik',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, 
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'destinasyik',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, 
  },
  production: {
    username: process.env.DB_USERNAME, //= await accessSecret('DB_USERNAME'),
    password: process.env.DB_PASSWORD, //= await accessSecret('DB_PASSWORD'),
    database: process.env.DB_NAME, //= await accessSecret('DB_NAME'),
    host: process.env.DB_HOST, //= await accessSecret('DB_HOST'),
    port: process.env.DB_PORT, //= await accessSecret('DB_PORT'),
    dialect: 'mysql',
    logging: false, 
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      },
    },
  },
};