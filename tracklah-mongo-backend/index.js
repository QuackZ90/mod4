require('dotenv').config()

// const { MongoClient } = require("mongodb");
// const uri = process.env.MONGOURI; // uri to the cloud mongodb instance
// const client = new MongoClient(uri);


// Import routes
const app = require("./routes/routes");
const {testConnection} = require('./model/model');
const PORT = process.env.PORT || 3300;

testConnection();

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`);
})

// http://localhost:3300/

