const express = require ('express');
const protectedRoutes = require('./routes/protected');
const publicRoutes = require('./routes/public');

const app = express();

app.use(express.json());

app.use('/protected', protectedRoutes);

app.use('/public', publicRoutes);

module.exports = app;