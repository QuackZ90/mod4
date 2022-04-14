const {userServices} = require('../services');

const userController = {
    create: async(req, res)=>{

        console.log('creating new user:', req.body);

        let results = await userServices.create(req.body);

        let {status, ...rest} = results;

        res.status(status);
        return res.json(rest);

    },

    login: async(req, res)=>{
        console.log('login into user:', req.body.username);

        let results = await userServices.login(req.body);

        let {status, ...rest} = results;

        res.status(status);
        return res.json(rest);

    },
};

module.exports = userController;