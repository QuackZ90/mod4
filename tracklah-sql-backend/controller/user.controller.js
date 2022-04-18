const {userServices} = require('../services');

const mongoAPI = require("../api/mongoAPI");

const userController = {
    create: async(req, res)=>{

        console.log('creating new user:', req.body);

        let userCreation = await userServices.create(req.body);

        let {"status":createStatus, ...createRest} = userCreation;

        if (createStatus !== 201){
            res.status(createStatus);
            return res.json(createRest);
        };

        let userLogin = await userServices.login({username:req.body.username, password:req.body.password});

        let {"status":loginStatus, jwtToken, userId, ...loginRest} = userLogin;
        console.log(userId);

        if (loginStatus !==201){
            res.status(loginStatus);

            return res.json({
                userCreation,
                userLogin,
            })
        }


        try{
            let folderCreation = await mongoAPI.post("/protected/user", {userId},
            {headers:{'authorization':jwtToken}
            });

            console.log(folderCreation);

            res.status(folderCreation.status);
            return res.json({
                userCreation,
                userLogin,
                folderCreation:folderCreation.data,
            });

        }catch(err){

            if (err.response){
                res.status(err.response.status);
                console.log(err);
                return res.json({
                    userCreation,
                    userLogin,
                    folderCreation:err.response.data,
                })  
            } else{
                console.log(err);
                res.status(500);
                return res.json({
                    userCreation,
                    userLogin,
                    folderCreation:{
                        err:err,
                    }
                })
            }
        }

        

        

    },

    login: async(req, res)=>{
        console.log('login into user:', req.body.username);

        let results = await userServices.login(req.body);

        let {status, ...rest} = results;

        res.status(status);
        return res.json(rest);

    },

    delete: async(req, res)=>{
        console.log('deleting user:', req.params.username);

        let results = await userServices.delete(req.params.username, req.token);

        let {status, ...rest} = results;

        res.status(status);
        return res.json(rest);
    }
};

module.exports = userController;