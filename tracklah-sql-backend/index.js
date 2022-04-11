const app = require('./App');
const PORT =3001;
const {testConnection, syncDatabase} = require ('./model');

testConnection();
syncDatabase();

app.listen(PORT, ()=>{
    console.log(`Listening to port: ${PORT}`);
});

