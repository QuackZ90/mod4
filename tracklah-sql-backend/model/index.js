const {Sequelize} = require('sequelize');

console.log(process.env.DATABASE_URL);

const sequelize = process.env.DATABASE_URL?
    (new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: true,
            rejectUnauthorized: false,
        }
    })):(new Sequelize('sqlite::memory:'));



async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log('Connection to database establised successfully.');
    }catch (error){
        console.error('Unable to connect to the database:', error);
    }
}


const User = require('./user.model')(sequelize);

async function syncDatabase(){
    await User.sync({alter:true}).then(()=>{
        console.log(`user table successfully updated`);
      }).catch(err=>{
        console.log('Error updating user table:', err);
      });
}




module.exports = {
    sequelize,
    testConnection,
    syncDatabase,
    User,
};