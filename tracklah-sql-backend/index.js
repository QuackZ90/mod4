const app = require('./App');
require('dotenv').config({ debug: true });
const PORT = process.env.PORT || 3001;
const {testConnection, syncDatabase} = require ('./model');


testConnection();
syncDatabase();

app.listen(PORT, ()=>{
    console.log(`Listening to port: ${PORT}`);
});

