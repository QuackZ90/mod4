const {User} = require('../model/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userServices = {
    create: async function (userData){
        let results = {
            message:null,
            status:null,
            data:null
        };

        const {username, password, name, email} = userData;

        let user = await User.findByPk(username);
        
        if(user != null){
            results.status = 403;
            results.message = 'Username already exists.'
            return results;
        };

        user = await User.findOne({where:{email}});

        if(user != null){
            results.status = 403;
            results.message = 'Email already exists.'
            return results;
        };


        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        try{
            const newUser = await User.create({
                hashedPassword,
                username,
                name,
                email
            });

            results.status = 200;
            results.message = `User ${newUser.username} created.`
            results.data = {
                username:newUser.username,
                email:newUser.email,
            }

        }catch(err){
            results.status = 500;
            results.message = err;
            console.log(err);

        };

        return results;
    }
}

module.exports = userServices;