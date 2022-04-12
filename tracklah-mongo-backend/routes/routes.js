const express = require("express");
const app = express();
app.use(express.json()); // allows us to read json data.

const protectedRoutes = require("./protected.routes");
const generalRoutes = require("./general.routes");
app.use('/protected', protectedRoutes);
app.use('/general', generalRoutes);

module.exports = app;