const express = require ('express');
const protectedRoutes = require('./routes/protected');
const publicRoutes = require('./routes/public');
const cors = require('cors');

const app = express();

app.use((req, res, next)=>{
    console.log('api called 1');
    next();
})

app.use(cors());

app.use((req, res, next)=>{
    console.log('api called 2');
    next();
})
app.use(express.json());

app.use('/protected', protectedRoutes);

app.use('/public', publicRoutes);

module.exports = app;