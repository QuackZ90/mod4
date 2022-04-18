require('dotenv').config({ debug: true });

const axios = require('axios');

const mongoAPI = axios.create({
    baseURL: process.env.MONGO_API
});

module.exports = mongoAPI
