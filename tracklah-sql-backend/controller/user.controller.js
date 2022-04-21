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

        let folderDeletion;

        console.log(req.token);
        let jwtToken = req.headers.authorization
        console.log(req.headers.authorization);

        try{
            
            folderDeletion = await mongoAPI.delete("/protected/user", {data: {userId: req.token.userId}, headers:{'authorization':jwtToken} });

            console.log(folderDeletion);

            res.status(folderDeletion.status);

        }catch(err){

            if (err.response){
                res.status(err.response.status);
                console.log(err.data);
                return res.json({
                    folderDeletion:{
                        message:err.response.data,
                    }
                })  
            } else{
                console.log(err);
                res.status(500);
                return res.json({
                    folderDeletion:{
                        err:err,
                    }
                })
            }
        }

        let results = await userServices.delete(req.params.username, req.token);

        let {status, ...rest} = results;

        res.status(status);
        return res.json({
            folderDeletion:folderDeletion.data,
            userDeletion: results

        });
    },

    existingUser: async (req, res)=>{

        let username;
        let email;

        if(req.query.checkusername){
            username = req.query.checkusername.toLowerCase();
        }

        if (req.query.checkemail){
            email = req.query.checkemail.toLowerCase();
        }

        if(!username && !email){
            res.status(400);
            return res.json({message:"Invalid search"});
        }

        if(username && email){
            res.status(400);
            return res.json({message:"only 1 query can be accepted"})
        }


        console.log(username);
        console.log(email)



        if(username){

            let results = await userServices.existingUser({username});

            let {status, ...rest} = results;

            res.status(status);
            return res.json(rest);
        }

        if(email){

            let results = await userServices.existingUser({email});

            let {status, ...rest} = results;

            res.status(status);
            return res.json(rest);
        }
    }
};

module.exports = userController;