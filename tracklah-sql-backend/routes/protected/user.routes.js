const express = require('express');
const router = express.Router();
const {userController} = require('../../controller');

router.use((req, res, next)=>{
    console.log(`user route called with url: ${req.url}, method: ${req.method}, body:`, req.body);
    next();
});

router.get('/',(req, res, next)=>{
    return res.json({message:"protected get request successful"});
});

router.delete('/:username', userController.delete);

// router.post('/session', validateLogin, userController.login);

module.exports=router;