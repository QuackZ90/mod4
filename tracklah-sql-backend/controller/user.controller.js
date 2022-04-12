const {userServices} = require('../services');

const userController = {
    create: async(req, res)=>{

        console.log('creating new user:', req.body);

        let results = await userServices.create(req.body);

        res.status(results.status);
        res.json(results);

    }
};

module.exports = userController;